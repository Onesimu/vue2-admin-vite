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
                console.log(output.code)
                return {
                    code: output.code,
                    map: output.map.toString()
                }

              // var style = /\<style.*?lang=qcs.*?\>([\s\S]+?)\<\/style\>/
              // var lse = /\<script.*?lang=ls.*?\>([\s\S]+?)\<\/script\>/
              // data.e(lse, '').e(style, function(i, m){ return '<style>' + u.qcs(m) + '</style>' })
            }
            if (/\.scss/.test(id)) {
                console.log(id, code)

                var oldCssText = code
                var newCssText = oldCssText
                if (oldCssText.includes(': ') && oldCssText.includes(' f: ') && oldCssText.includes(' w: ')) {
                  var c = oldCssText.replace(/bgi:/g, 'background-image:').replace(/lg\(/g, 'linear-gradient(').replace(/\/\*(\s|.)*?\*\//g, '')
                  newCssText = qcs(c)
                  if (process.env.isMiniprogram) newCssText = newCssText.replace(/px/g, 'rpx')
                }
                console.log(newCssText)
            // E:/dev/vue2-admin-vite/src/views/dashboard/index.vue?vue&type=style&index=0&scoped=48f440f2&lang.qcs

                const code3 = `
                import { createHotContext as __vite__createHotContext } from "/@vite/client";
                import.meta.hot = __vite__createHotContext("${id.slice(id.indexOf('/src'))}");
                import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/@vite/client"
                const __vite__id = "${id}"
                const __vite__css = "${newCssText}"
                __vite__updateStyle(__vite__id, __vite__css)
                import.meta.hot.accept()
                export default __vite__css
                import.meta.hot.prune(() => __vite__removeStyle(__vite__id))
                `
                console.log(code3)

                return {
                    code: newCssText,
                    map: {}
                }


            }
        }
    }
}
