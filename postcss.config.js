module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 0,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
      },
    },
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 设计稿宽度
      viewportHeight: 667, // 设计稿高度（可选）
      unitPrecision: 4, // 单位转换后保留的小数位数
      viewportUnit: 'vw', // 转换成的视窗单位
      selectorBlackList: ['.ignore', '.hairlines'], // 不进行转换的类名，如果需要转换所有元素，保持为空
      minPixelValue: 1, // 小于或等于1px不转换为视窗单位
      mediaQuery: true, // 允许在媒体查询中转换px
      exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件
    },
  },
};
