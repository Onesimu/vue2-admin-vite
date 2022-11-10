'use strict';

// var postcss = require('postcss');
// require('./lib/u.js');
import './u.js'
import postcss from 'postcss'
// var qcss = require('./qcs.js');
import { qcs } from './qcs.js'
 
// module.exports = postcss.plugin('postcss-qcss', function (options) {
//   return function (css, result) {
//     var oldCssText = css.toString();
//     var newCssText = oldCssText
//     if (oldCssText.includes(': ') && oldCssText.includes(' f: ') && oldCssText.includes(' w: ')) {
//       var c = oldCssText.replace(/bgi:/g, 'background-image:').replace(/lg\(/g, 'linear-gradient(').replace(/\/\*(\s|.)*?\*\//g, '')
//       newCssText = qcss(c)
//       if (process.env.isMiniprogram) newCssText = newCssText.replace(/px/g, 'rpx')
//     }

//     var newCssObj = postcss.parse(newCssText);
//     result.root = newCssObj;
//   };
// });

module.exports = {
  postcssPlugin: 'postcss-qcss',
  Once (css, result) {
    var oldCssText = css.toString();
    var newCssText = oldCssText
    if (oldCssText.includes(': ') && oldCssText.includes(' f: ') && oldCssText.includes(' w: ')) {
      // o(css, oldCssText)
      // o(result)
      var c = oldCssText.replace(/bgi:/g, 'background-image:').replace(/lg\(/g, 'linear-gradient(').replace(/\/\*(\s|.)*?\*\//g, '')
      newCssText = qcs(c)
      if (process.env.isMiniprogram) newCssText = newCssText.replace(/px/g, 'rpx')
    }

    var newCssObj = postcss.parse(newCssText);
    result.root = newCssObj;
  }
}
// module.exports.postcss = true