module.exports = function ({
  colors,
  strategy = 'override',
  colorTransform = (color) => color,
} = {}) {
  return function ({ addComponents, e, config }) {
    const configColors = config('theme.colors', config('colors'))

    if (colors && typeof colors === 'object') {
      if (strategy === 'override') {
        colors = Object.assign({}, configColors, colors)
      } else if (strategy === 'replace') {
        colors = colors
      } else if (strategy === 'extend') {
        colors = Object.assign({}, colors, configColors)
      }
    } else {
      colors = configColors
    }

    let root = {}
    Object.keys(colors).forEach(colorKey => {
      root[`--${e(colorKey)}`] = colorTransform(colors[colorKey])
    })

    addComponents({ ':root': root })
  }
}
