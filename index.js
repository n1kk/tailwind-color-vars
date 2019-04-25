module.exports = function ({
  colors,
  strategy = 'override',
  colorTransform = (color) => color,
} = {}) {
  return function ({ addComponents, e, config }) {
    if (colors && typeof colors === 'object') {
      if (strategy === 'override') {
        colors = Object.assign({}, config('theme.colors'), colors)
      } else if (strategy === 'replace') {
        colors = colors
      } else if (strategy === 'extend') {
        colors = Object.assign({}, colors, config('theme.colors'))
      }
    } else {
      colors = config('theme.colors')
    }

    let root = {}
    Object.keys(colors).forEach(colorKey => {
      root[`--${e(colorKey)}`] = colorTransform(colors[colorKey])
    })

    addComponents({ ':root': root })
  }
}
