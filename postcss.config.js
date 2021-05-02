module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667, // 视窗的高度 （也可以不配置）
      unitPrecision: 5, // 指定'px'转化为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore'], //指定不需要转化的类，写上类名即可，ignore的用法是在组件中视图的标签下的类名后添加一个ignore
      minPixelValue: 1, // 小于或等于`1px`不转化未视窗单位
      mediaQuery: false // 允许在媒体查询中转换`px`
    }
  }
}