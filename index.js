module.exports = function colorVars({ colors, strategy = 'override', colorTransform } = {}) {
  return function tailwindColorVarsPlugin({ addUtilities, addComponents, e, prefix, config }) {
    if (colors && typeof colors === 'object') {
      if (strategy === 'override') {
        colors = Object.assign({}, config('colors'), colors)
      } else if (strategy === 'replace') {
        //colors = colors
      } else if (strategy === 'extend') {
        colors = Object.assign({}, colors, config('colors'))
      }
    } else {
      colors = config('colors')
    }
    let names = Object.keys(colors)
    let root = {}, css = {
      ':root': root,
    }
    names.forEach(col => {
      root[`--${e(col)}`] = colorTransform ? colorTransform(colors[col]) : colors[col]
    })
    console.log({css})
    addComponents(css)
  }
}
