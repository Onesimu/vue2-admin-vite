<template>
    <fs-crud ref="crudRef" v-bind="crudBinding"/>
</template>

<script>
  import { getList } from '@/api/table'
    import {defineComponent,onMounted} from "vue";
    // import createCrudOptions from "./crud";
    import { useFs} from "@fast-crud/fast-crud";

    function createCrudOptions({expose}) {
    return {
  crudOptions: {
    request: { pageRequest: getList },
    columns: [
      {
        title: '消息类型',
        key: 'id',
        search: true,
        type: 'select',
        dict: {
          data: [
            {
              value: '0',
              label: '系统消息'
            }, {
              value: '1',
              label: '客户消息'
            }
          ]
        }
      }, {
        title: '金额',
        key: 'title',
        search: {},
        type: 'select'
      }, {
        title: '时间',
        key: 'display_time',
        type: 'date'
      }, {
        title: '状态',
        key: 'status',
        search: { disabled: false },
        type: 'select',
        dict: {
          data: [
            {
              value: '0',
              label: '未读'
            }, {
              value: '1',
              label: '已读'
            }
          ]
        }
      }
    ],
    rowHandle: {
      width: 100,
      view: { show: false },
      edit: { show: false },
      remove: { show: false },
      custom: [{
        icon: 'el-icon-view',
        text: '阅读',
        emit: 'detail',
        size: 'mini'
      }]
    }
  }
}

}

    export default defineComponent({
        name: "MyFirstCrud", // 实际开发中可以修改一下name
        setup() {

            // // crud组件的ref
            // const crudRef = ref();
            // // crud 配置的ref
            // const crudBinding = ref();
            // // 暴露的方法
            // const {crudExpose} = useExpose({crudRef, crudBinding});
            // // 你的crud配置
            // const {crudOptions} = createCrudOptions({crudExpose});
            // // 初始化crud配置
            // const {resetCrudOptions , appendCrudBinding} = useCrud({crudExpose, crudOptions});

            //  =======以上为fs的初始化代码=========
            //  =======你可以简写为下面这一行========
            
            const { crudRef, crudBinding, crudExpose } = useFs({ createCrudOptions });
            
            // 页面打开后获取列表数据
            onMounted(() => {
                crudExpose.doRefresh();
            });
            return {
                crudBinding,
                crudRef,
            };
        },
    });
</script>
