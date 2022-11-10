const livescript = require('livescript')
const { extname } = require('path')

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
            console.log(id, output.code)
                return {
                    code: output.code,
                    map: output.map.toString()
                }
            }
        }
    }
}
