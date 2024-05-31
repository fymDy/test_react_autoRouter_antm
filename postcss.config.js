module.exports = {
    plugins: [
      require('postcss-preset-env')({
        stage: 0,
        features: {
          'custom-media-queries': true,
          'nesting-rules': true,
        },
      }),
      require('autoprefixer'),
      require('postcss-px-to-viewport')({
        viewportWidth: 375,  // 根据设计稿调整视口宽度
        viewportHeight: 667, // 根据设计稿调整视口高度
        unitPrecision: 5,
        viewportUnit: 'vw',
        selectorBlackList: ['.ignore', '.hairlines'],
        minPixelValue: 1,
        mediaQuery: false,
      }),
    ],
  };
  