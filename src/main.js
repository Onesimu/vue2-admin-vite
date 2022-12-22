import '../dev/qcs/u.js'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/permission' // permission control

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css
import '@/styles/icon.css'

import SvgIcon from '@/components/SvgIcon'// svg component

import 'virtual:svg-icons-register' // svg-register
import { setupProdMockServer } from '../mock/mock.js'
setupProdMockServer(import.meta.env.VITE_APP_BASE_API)

const app = createApp(App)
// 分环境处理
// if (process.env.NODE_ENV === 'development') {
//   if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in window) {
//   // 这里__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue赋值一个createApp实例
//     window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
//   }
//   app.config.devtools = true
// }
app.component('SvgIcon', SvgIcon)
app.use(ElementPlus).use(router).use(store).mount('#app')

// const req = require.context('@/icons/svg', false, /\.svg$/)
// const requireAll = requireContext => requireContext.keys().map(requireContext)
// requireAll(req)

import {FastCrud} from "@fast-crud/fast-crud";
import "@fast-crud/fast-crud/dist/style.css";

import ui from "@fast-crud/ui-element";
app.use(ui); 
app.use(FastCrud, {
   // i18n, //i18n配置，可选，默认使用中文，具体用法请看demo里的 src/i18n/index.js 文件
   // 此处配置公共的dictRequest（字典请求）
   // async dictRequest({ dict }) {
   //     return await request({ url: dict.url }); //根据dict的url，异步返回一个字典数组
   // },
   //公共crud配置
   commonOptions() {
       return {
           request:{
               //接口请求配置
               //你项目后台接口大概率与fast-crud所需要的返回结构不一致，所以需要配置此项
               //请参考文档http://fast-crud.docmirror.cn/api/crud-options/request.html
               // transformQuery: ({ page, form, sort }) => {
               //     //转换为你pageRequest所需要的请求参数结构
               //     return {page, form, sort};
               // },
               transformRes: ({ res }) => {
                   //将pageRequest的返回数据，转换为fast-crud所需要的格式
                   //return {records,currentPage,pageSize,total};
                   return  {...res}
               }
           },
           //你可以在此处配置你的其他crudOptions公共配置
       };
   },
});