const path = require('path');

module.exports = {
  // 配置样式处理
  style: {
    postcss: {
      plugins: [
        // 使用 postcss-preset-env 插件
        require('postcss-preset-env')({
          stage: 0, // 启用所有现代 CSS 特性
          features: {
            'nesting-rules': true, // 启用嵌套规则
            'custom-media-queries': true, // 启用自定义媒体查询
          },
        }),
        // 使用 postcss-px-to-viewport 插件
        require('postcss-px-to-viewport')({
          viewportWidth: 375,  // 视口宽度，通常对应设计稿的宽度
          viewportHeight: 667, // 视口高度，通常对应设计稿的高度
          unitPrecision: 5, // 单位转换后的小数位数
          viewportUnit: 'vw', // 使用的视口单位
          selectorBlackList: ['.ignore', '.hairlines'], // 需要忽略的选择器
          minPixelValue: 1, // 小于或等于 1px 的值不转换为视口单位
          mediaQuery: false, // 不允许在媒体查询中转换 px
        }),
      ],
    },
  },
   // 配置开发服务器
   devServer: {
    port: 9001, // 你希望的端口号
  },
  // 配置 Webpack
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // 找到处理 SCSS 的规则，添加 postcss-loader
      const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);
      const scssRule = oneOfRule.oneOf.find(rule => rule.test && rule.test.toString().includes('scss'));

      if (scssRule) {
        scssRule.use.splice(2, 0, {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('postcss-preset-env')({
                  stage: 0,
                  features: {
                    'nesting-rules': true,
                    'custom-media-queries': true,
                  },
                }),
                require('postcss-px-to-viewport')({
                  viewportWidth: 375,
                  viewportHeight: 667,
                  unitPrecision: 5,
                  viewportUnit: 'vw',
                  selectorBlackList: ['.ignore', '.hairlines'],
                  minPixelValue: 1,
                  mediaQuery: false,
                }),
              ],
            },
          },
        });
      }
       // 配置别名
       webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@': path.resolve(__dirname, 'src'),
      };

        // 根据环境变量设置不同的输出目录和文件名格式
        const isProduction = env === 'production';
      // 根据环境变量设置不同的输出目录和文件名格式
      if (isProduction) {
        //todo分模块打包 
        webpackConfig.optimization = {
          splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 70000,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: '~',
            cacheGroups: {
              defaultVendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                reuseExistingChunk: true,
                name(module) {
                  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                  return `npm.${packageName.replace('@', '')}`;
                },
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
              },
            },
          },
        };
      }
  // 修改输出文件名和输出目录
  webpackConfig.output = {
    ...webpackConfig.output,
    path: path.resolve(__dirname, 'dist'), // 指定输出目录为 'dist'
    filename: 'static/js/[name].[hash].bundle.js', // 指定主文件的输出格式，其中 [name] 是文件名，[hash] 是文件的哈希值。
    chunkFilename: 'static/js/[name].[hash].chunk.js', // 指定 chunk 文件名格式
  };
      return webpackConfig;
    },
  },
};
