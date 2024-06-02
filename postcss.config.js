/* stage: 0: 表示启用所有阶段的特性，包括实验性的、草案阶段的特性。这些特性可能在未来的 CSS 标准中发生变化。
stage: 1: 表示启用第一阶段的特性，这些特性相对较新，但已经有了较稳定的提案。
stage: 2: 表示启用第二阶段的特性，这些特性在规范中更为成熟，修改的可能性较小。
stage: 3: 表示启用第三阶段的特性，这些特性已经非常稳定，基本上可以确定会被纳入 CSS 标准。
stage: 4: 表示启用第四阶段的特性，这些特性已经被广泛接受和实现，几乎可以认为是标准的一部分。 */
module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 2, // 值可以是 0 到 4，数字越小表示你希望使用的 CSS 特性越前沿。默认是阶段 2，你可以根据需求调整
      features: {
        'nesting-rules': true // 示例：启用嵌套规则
      },
      autoprefixer: { grid: true } // 如果需要，启用网格布局前缀
    }),
    require('postcss-px-to-viewport')({
      unitToConvert: 'px',
      viewportWidth: 375,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['ignore'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [/node_modules/],
      landscape: false
    })
  ]
};
