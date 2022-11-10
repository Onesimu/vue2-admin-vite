<template>
  <div :class="{'page-compact':crud.pageOptions.compact}">
    <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners" @detail="detail">
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" />
        <el-button-group>
          <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus" />全部标记为已读</el-button>
        </el-button-group>
        <!-- <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"/> -->
      </div>
    </d2-crud-x>
  </div>
</template>

<script>
  const crudOptions = (vm) => { // vm即this
    return {
      columns: [{
          title: '消息类型',
          key: 'id',
          search: true,
          type: 'select', // 字段类型为选择框
          dict: { // 数据字典配置， 供select等组件通过value匹配label
            data: [ // 本地数据字典，若data为null，则通过http请求获取远程数据字典
              { value: '0', label: '系统消息' },
              { value: '1', label: '供应商消息' },
            ]
          }
        },
        {
          title: '订单金额',
          key: 'title',
          search: {}, // 启用查询
          type: 'select', // 字段类型为选择框
        },
        {
          title: '下单时间',
          key: 'display_time',
          type: 'date', // 字段类型为选择框
        },
        {
          title: '阅读状态',
          key: 'status',
          search: {
            disabled: false,
          }, // 启用查询
          type: 'select', // 字段类型为选择框
          dict: { // 数据字典配置， 供select等组件通过value匹配label
            data: [ // 本地数据字典，若data为null，则通过http请求获取远程数据字典
              { value: '0', label: '未读' },
              { value: '1', label: '已读' },
            ]
          }
        }
      ],
      rowHandle: {
        width: 100,
        view: {
          show: false
        },
        edit: {
          show: false,
        },
        remove: {
          show: false
        },
        custom: [ //自定义按钮
          {
            icon: 'el-icon-view',
            text: '阅读',
            emit: 'detail',
            size: 'mini',
          }
        ],
      }
    }
  }

  import { d2CrudPlus } from 'd2-crud-plus'
  // import { AddObj, GetList, UpdateObj, DelObj } from './api' //查询添加修改删除的http请求接口

  import { getList } from '@/api/table'
  export default {
    mixins: [d2CrudPlus.crud], // 最核心部分，继承d2CrudPlus.crud
    methods: {
      getCrudOptions() { return crudOptions(this) },
      pageRequest(query) { return getList(query) }, // 数据请求
      // addRequest (row) { return AddObj(row) }, // 添加请求
      // updateRequest (row) {return UpdateObj(row)},// 修改请求
      // delRequest (row) {return DelObj(row.id)}// 删除请求
      // 还可以覆盖d2CrudPlus.crud中的方法来实现你的定制化需求
      detail(e) {
        console.log(e.row)
        // this.$router.push('/order/detail')
        this.$alert('<strong>This is <i>HTML</i> string</strong><br>' + e.row.title, 'HTML String', {
          dangerouslyUseHTMLString: true
        })
      }
    }
  }
</script>
