This plugin generates a set of css vars from tailwinds colors list and puts then into the `:root` selector.

## Install
```bash
npm i tailwind-colors-vars
```

## API

#### `colorVars({ colors, strategy = 'override', colorTransform } = {})`
Creates tailwind plugin that registers colors from config as css vars.

_`colors`_: [optional] an object with colors to extend, replace or override config colors  </br>
_`strategy`_: [optional] string:</br>
- `extend`_: will merge config colors with given colors, config ones will take priority</br>
- `override`_: will merge config colors with given colors, given ones will take priority</br>
- `replace`_: will discard config colors and only use given ones</br>
_`colorTransform`_: [optional] Function that will be invoked on every color value before injection</br>

## Usage
In tailwind config
```javascript
const colorVars = require('tailwind-color-vars')
module.exports = {
  plugins: [
    colorVars(),
  ],
}
```
This will produce css like:
```css
:root { 
  --transparent: transparent;
  --black: #22292f;
  --grey-darkest: #3d4852;
  --grey-darker: #606f7b;
  --grey-dark: #8795a1;
  ...
}
```
To extend, override or replace colors:
```javascript
const colorVars = require('tailwind-color-vars')
module.exports = {
  plugins: [
    colorVars({
      colors: {
        'primary': 'rgba(0, 80, 200, 0.7)',
        'black': 'black',
      },
      // default value, this will give passed values priority
      strategy: 'override',  
    }),
  ],
}
```
This will produce:
```css
:root {
  --primary: rgba(0, 80, 200, 0.7);
  --transparent: transparent;
  --black: black;
  ...
}
```
To process every color value before injection you can specify `colorTransform`. For example you can transform all values to a set value type:
```javascript
const colorVars = require('tailwind-color-vars')
tinycolor = require("tinycolor2");
module.exports = {
  plugins: [
    colorVars({
      colors: {
        'primary': 'rgba(0, 80, 200, 0.7)',
        'black': 'black',
      },
      // this will give priority to config values
      // so black will not be overridden
      strategy: 'extend',
      // this will parse each color value and return it in `rgb()/rgba()` format
      colorTransform: col => tinycolor(col).toRgbString()
    }),
  ],
}
```
This will produce:
```css
:root {
  --primary: rgba(0, 80, 200, 0.7);
  --black: rgb(34, 41, 47);
  --transparent: rgba(0, 0, 0, 0);
  --grey-darkest: rgb(61, 72, 82);
  --grey-darker: rgb(96, 111, 123); 
  ...
}
```
