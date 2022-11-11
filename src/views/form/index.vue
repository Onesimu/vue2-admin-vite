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

<!-- <script setup lang=ls>
  const detail = console.log
</script> -->

<script lang=ls>
crudOptions = (vm) ->
  {
    columns: [
      {
        title: '消息类型'
        key: 'id'
        search: true
        type: 'select'
        dict: data: [
          {
            value: '0'
            label: '系统消息'
          }
          {
            value: '1'
            label: '客户消息'
          }
        ]
      }
      {
        title: '金额'
        key: 'title'
        search: {}
        type: 'select'
      }
      {
        title: '时间'
        key: 'display_time'
        type: 'date'
      }
      {
        title: '状态'
        key: 'status'
        search: disabled: false
        type: 'select'
        dict: data: [
          {
            value: '0'
            label: '未读'
          }
          {
            value: '1'
            label: '已读'
          }
        ]
      }
    ]
    rowHandle:
      width: 100
      view: show: false
      edit: show: false
      remove: show: false
      custom: [ {
        icon: 'el-icon-view'
        text: '阅读'
        emit: 'detail'
        size: 'mini'
      } ]
  }

import { d2CrudPlus } from 'd2-crud-plus'
import { getList } from '@/api/table'
export default {
  mixins: [d2CrudPlus.crud]
  methods: {
    getCrudOptions: -> crudOptions this
    pageRequest: getList
    detail: console.log
  }
}
</script>
