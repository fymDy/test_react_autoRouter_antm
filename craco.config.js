const path = require('path');

module.exports = {
  // 配置开发服务器
  devServer: {
    port: 9001, // 你希望的端口号
  },
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

  // 配置 Webpack
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // 找到处理 SCSS 的规则，添加 postcss-loader
     // 查找包含 `oneOf` 属性的规则，`oneOf` 通常用于定义多个加载器，但只会应用其中第一个匹配的加载器
const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);

// 在 `oneOf` 规则中查找处理 SCSS 文件的具体规则，通过检查 `test` 属性并确认它包含 `scss`
const scssRule = oneOfRule.oneOf.find(rule => rule.test && rule.test.toString().includes('scss'));

if (scssRule) {
  // 使用 `splice` 方法在 `use` 数组的第三个位置（索引为 2）插入一个新的加载器 `postcss-loader`
  scssRule.use.splice(2, 0, {
    loader: 'postcss-loader', // loader 字段指定了要使用的加载器，这里是 postcss-loader。
    options: {//options 字段用于配置 postcss-loader 的选项。
      postcssOptions: {//postcssOptions 字段用于配置 PostCSS 的选项
        plugins: [//包含 PostCSS 的插件：
          // 使用 `postcss-preset-env` 插件，启用现代 CSS 特性
          require('postcss-preset-env')({//用于启用现代 CSS 特性，包括嵌套规则和自定义媒体查询。
            stage: 0, // 启用所有阶段的现代 CSS 特性
            features: {
              'nesting-rules': true, // 启用嵌套规则
              'custom-media-queries': true, // 启用自定义媒体查询
            },
          }),
          // 使用 `postcss-px-to-viewport` 插件，用于将 px 单位转换为视口单位 vw，以实现响应式设计。
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
            chunks: 'all', // 对所有的 chunks（包括同步和异步）进行代码分割
            minSize: 20000, // 模块的最小大小，单位为字节。只有大于 20KB 的模块会被分割
            maxSize: 70000, // 模块的最大大小，单位为字节。分割后每个模块的最大大小为 70KB
            minChunks: 1, // 模块被引用的最少次数。被引用至少一次的模块会被分割
            maxAsyncRequests: 30, // 按需加载时的最大并行请求数。一次加载最多允许 30 个并行请求
            maxInitialRequests: 30, // 入口点的最大并行请求数。一个入口文件最多允许 30 个并行请求
            automaticNameDelimiter: '~', // 自动生成的文件名的分隔符
            cacheGroups: {
              defaultVendors: {
                test: /[\\/]node_modules[\\/]/, // 匹配 `node_modules` 目录中的模块
                priority: -10, // 优先级设置为 -10
                reuseExistingChunk: true, // 允许复用已经存在的 chunk，而不是创建新的 chunk
                name(module) {
                  // 获取模块名称并去掉路径中的 `@` 符号，以便生成适合的文件名
                  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                  return `npm.${packageName.replace('@', '')}`;
                },
              },
              default: {
                minChunks: 2, // 模块被引用至少两次才会被分割到这个 cache group
                priority: -20, // 优先级设置为 -20
                reuseExistingChunk: true, // 允许复用已经存在的 chunk，而不是创建新的 chunk
              },
            },
          },
        };
        
      }
      // 修改输出文件名和输出目录
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.resolve(__dirname, isProduction ? 'dist' : 'build'),
        filename: isProduction ? 'static/js/[name].[contenthash].bundle.js' : 'static/js/[name].bundle.js',
        chunkFilename: isProduction ? 'static/js/[name].[contenthash].chunk.js' : 'static/js/[name].chunk.js',
      };
      return webpackConfig;
    },
  },
};
