<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script setup>
  import store from '@/store'

  const name = store.getters.name
  console.log(name)
</script>
 
<script>
  // import mixins from './mixins'
  // export default {
  //     mixins: [mixins]
  // }
</script>  

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
