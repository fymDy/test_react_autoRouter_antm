const { whenProd, whenDev } = require('@craco/craco');
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      // 这里可以添加Webpack别名配置
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig, { env, paths }) => {
      // 找到 oneOf 规则
      const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);

      if (oneOfRule) {
        // 添加一个用于处理 SCSS 模块文件的规则
        oneOfRule.oneOf.unshift({
          test: /\.(scss|sass)$/,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: {
                  localIdentName: '[name]__[local]__[hash:base64:5]',
                },
                sourceMap: true,
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  plugins: [
                    require('postcss-px-to-viewport-8-plugin')({
                      viewportWidth: 375, // 视口宽度，可以根据设计稿调整
                      viewportHeight: 667, // 视口高度，可以不设置
                      unitPrecision: 5, // 转换后保留的小数位数
                      viewportUnit: 'vw', // 转换成的视口单位
                      selectorBlackList: ['ignore', '.ignore'], // 忽略转换的类
                      minPixelValue: 1, // 最小的转换数值
                      mediaQuery: false, // 是否允许在媒体查询中转换
                    }),
                  ],
                },
                sourceMap: true,
              },
            },
            {
              loader: require.resolve('sass-loader'),
              options: {
                sourceMap: true,
              },
            },
          ],
        });
      }

      return webpackConfig;
    },
  },
};
