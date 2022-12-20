const livescript = require('livescript')
import { qcs } from './qcs/qcs.js'
import { srct, dett } from './lsx.js'
import  * as fs  from 'fs'

module.exports = (options = {}) => {
  options = {
    bare: true,
    header: false,
    const: true,
    json: false,
    warn: true,
    map: 'linked',
    sourceMap: true,
    extensions: ['.ls'],
    ...options
  }
  return {
    load(id) {
      if (id.i('qcs=')) {
        const content = fs.readFileSync(id.split('?')[0], {encoding:'utf8', flag:'r'})
        const style = content.match(/\<style qcs.*?\>(.+?)\<\/style\>/s)[1]
        o(id, style)
        var oldCssText = style
        var newCssText = oldCssText
        if (oldCssText.includes(': ') && oldCssText.n(/\b\w: /)) {
          var c = oldCssText.replace(/bgi:/g, 'background-image:').replace(/lg\(/g, 'linear-gradient(').replace(/\/\*(\s|.)*?\*\//g, '')
          newCssText = qcs(c)
          if (process.env.isMiniprogram) newCssText = newCssText.replace(/px/g, 'rpx')
        }
        return newCssText
      }
    },
    transform(code, id) {
      if (/\.ls$/.test(id)) {
        options = {
          filename: id,
          outputFilename: id.replace(/\.ls$/, '.js'),
          ...options
        }

        if (id.i('setup=true')) {
          const imp = code.match(/^import .+/gm)?.t('\n') || ''
          const cod = srct(code)
          const output = livescript.compile(cod, options)
          const sco = dett(output.code)
          const data = sco.match(/^var .+/gm)?.t(',').e('var', '').e(';', '')
          const pcod = sco.e(/^\s*(import .+)$/gm, '')
          const code3 = `
                    ${imp}
                    export default {
                      setup() {
                        ${pcod}
                        return {${data}}
                      }
                    }
                  `
          return {
            code: code3,
            map: output.map
          }
        }

        const cod = srct(code)
        const output = livescript.compile(cod, options)
        const sco = dett(output.code)
        return {
          code: sco,
          map: output.map
        }
      }
    }
  }
}