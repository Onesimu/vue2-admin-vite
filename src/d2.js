import Vue from 'vue'

import { d2CrudPlus } from 'd2-crud-plus'
import d2CrudX from 'd2-crud-x'

Vue.use(d2CrudX, { name: 'd2-crud-x' }) //注册名称为d2-crud-x ，不传name则使用d2-crud作为标签名称

Vue.use(d2CrudPlus, {
  starTip: false,
  //获取数据字典的请求方法
  //可在dict中配置getData方法覆盖此全局方法
  // getRemoteDictFunc (url,dict) {
  //   return request({ // 用你项目中的http请求
  //     url: url,
  //     method: 'get'
  //   }).then(ret=>{
  //     return ret.data  //返回字典数组
  //   })
  // },
  commonOption () { //d2-crud option 全局配置，每个页面的crudOptions会以全局配置为基础进行覆盖
    return {
      format: {
        page: { // page接口返回的数据结构配置，
          request: { // 请求参数
            current: 'current', //当前
            size: 'size'
          },
          response: { //返回结果
            current: 'current', // 当前页码 ret.data.current
            size: 'size', // 每页条数，ret.data.size,
            //size: (data) => { return data.size }, //你也可以配置一个方法，自定义返回
            total: 'total', // 总记录数 ret.data.total
            records: 'items' // 列表数组 ret.data.records
          }
        }
      },
      formOptions: {
        defaultSpan: 12 // 默认的表单 span
      },
      options: {
        // height: '100%' // 表格高度100%，此时d2-crud-x外部容器必须有高度, 使用toolbar必须设置
      },
      pageOptions: {
        compact: true // 是否紧凑型页面
      },
      viewOptions: {
        disabled: true // 开启查看按钮
      }
    }
  }
})
