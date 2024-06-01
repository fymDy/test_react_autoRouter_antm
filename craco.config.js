const path = require('path');
console.log('77777=',path.join(__dirname, 'postcss.config.js'))
module.exports = {
  // 配置开发服务器
  devServer: {
    port: 9001, // 你希望的端口号
  },
    // 配置 Webpack
    webpack: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      configure: (webpackConfig, { env, paths }) => {
         // 修改构建输出目录
      paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
      webpackConfig.output = {
        ...webpackConfig.output,
        path: paths.appBuild,
      };
        // 找到处理 SCSS 的规则，添加 postcss-loader
        const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);
        const scssRule = oneOfRule.oneOf.find(rule => rule.test && rule.test.toString().includes('.scss' ));
  
        if (scssRule) {
          scssRule.use.splice(2, 0, {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.join(__dirname, 'postcss.config.js'),
                // plugins: [
                //   require('postcss-preset-env')({
                //     stage: 0,
                //     features: {
                //       'nesting-rules': true,
                //       'custom-media-queries': true,
                //     },
                //   }),
                //   require('postcss-px-to-viewport')({
                //     viewportWidth: 375,
                //     viewportHeight: 667,
                //     unitPrecision: 5,
                //     viewportUnit: 'vw',
                //     selectorBlackList: ['.ignore', '.hairlines'],
                //     minPixelValue: 1,
                //     mediaQuery: false,
                //   }),
                // ],
              },
            },
          });
        }


        return webpackConfig;
      },
    },
  
};
