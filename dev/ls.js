const livescript = require('livescript')
import { qcs } from './qcs/qcs.js'

module.exports = (options = {}) => {
    options = {
        bare: true,
        header: true,
        const: false,
        json: false,
        warn: true,
        map: 'linked',
        sourceMap: true,
        extensions: ['.ls'],
        ...options
    }
    return {
        transform(code, id) {
            if (/\.ls$/.test(id)) {
                options = { filename: id, outputFilename: id.replace(/\.ls$/,'.js'), ...options }
                const cod = code.replace(/^\s*[\/]{2}/gm, '#').e(/^import .+/gm, '``$&``').e(/^export default/gm, '``$&``')
                const output = livescript.compile(cod, options)
            // console.log(id, output.code)
                return {
                    code: output.code,
                    map: output.map.toString()
                }
            }
            if (/\.qcs/.test(id)) {
                console.log(id)

                var oldCssText = code
                var newCssText = oldCssText
                if (oldCssText.includes(': ') && oldCssText.includes(' f: ') && oldCssText.includes(' w: ')) {
                  var c = oldCssText.replace(/bgi:/g, 'background-image:').replace(/lg\(/g, 'linear-gradient(').replace(/\/\*(\s|.)*?\*\//g, '')
                  newCssText = qcs(c)
                  if (process.env.isMiniprogram) newCssText = newCssText.replace(/px/g, 'rpx')
                }

                return {
                    code: newCssText,
                    map: {}
                }

            }
        }
    }
}
