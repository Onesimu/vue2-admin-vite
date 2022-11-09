function repCode(code) {//处理编号，自动加1
    var nf = code.match(/(\d+)([^\d]*)$/i)[1];
    return code.replace(/(\d+)([^\d]*)$/i, PrefixInteger(Number(nf) + 1, nf.length) + "$2");
}
function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}

import 'https://cdn.jsdelivr.net/gh/Onesimu/u.js/u/u.js'

//const v = new TextDecoder().decode(await Deno.readAll(Deno.stdin))

const set = Deno.writeTextFileSync
const get = Deno.readTextFileSync

function fs(i, t) {
    if (typeof t == 'function') return set(i, t(get(i)))
    if (t) return set(i, t)
    return get(i, t)
}

const fn = i => i.replace(/letter-spacing: 0px;$/gm, '')
  .e(/text-decoration: none;$/gm, '')
  .e(/flex-direction: row;$/gm, '')
  .e(/justify-content: flex-start;$/gm, '')
  .e(/line-height: normal;$/gm, '')
  .e(/white-space: normal;$/gm, '')
  .e(/position: relative;$/gm, '')
  .e(/webkit-line-clamp/g, '-webkit-line-clamp')
  .e(/webkit-box-orient/g, '-webkit-box-orient')
  .replace(/lines: \d+;/gm, '')
  .replace(/rgba\(255, 255, 255, 1\)/g, 'white')
  .replace(/(\n(\n)*\s*(\n)*\n)/g, '\n')

const fn1 = i => {
  var ti = i
  const ls = i.match(/class=".+?"/g).map(it => it.split('"')[1])
  const lss = i.match(/\..+?{[\s\S]+?}/g)
  for (const it of lss) {
    const t = it.split('{')[0].trim().split(' ').at(-1).slice(1).e(/:.+/, '')
    if (!ls.includes(t)) {
      ti = ti.replace(it, '')
    }
  }
  return ti.replace(/(\n(\n)*\s*(\n)*\n)/g, '\n')
}

const fn2 = ts => {
  for(var i = 0, tn = ts; tn.search(/https:\/\/via.placeholder.com\/[^"]+/) != -1; i++) { 
    tn = tn.replace(/https:\/\/via.placeholder.com\/[^"]+/, './images/img_'+ i + '.png') 
  } 
  return tn
}  

// fs('/src/views/detail.vue', fn1)

const wd = fs('./up.txt')
const d = wd.t().t('\n').n().t(1).t(i => i.split(/\s+/)).t(i => `${i[0]}@${i[2]}`).join(' ')
o('pnpm update ' + d)