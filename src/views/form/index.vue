<template>
  <div class=e1>
  <fs-crud ref="crudRef" v-bind="crudBinding" />
  </div>
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
    columns: {
     title: {
        title: '金额',
        key: 'title',
        search: {},
        type: 'select'
      }, 
      display_time: {
        title: '时间',
        key: 'display_time',
        type: 'date'
      }, 
      status: {
        title: '状态',
        key: 'status',
        type: 'select',
      }
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

<style qcs scoped>
  .e1 { h: 100vh }
</style>