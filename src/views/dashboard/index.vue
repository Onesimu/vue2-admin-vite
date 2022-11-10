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

<!-- <script lang="ls" setup>
  import store from '@/store'
  // name = store.getters.name
  name = 'adfja'
  console.log 1
  console.log(name)
  // export default 
  // {}
</script> -->

<!-- <script lang="ls">
  export default {}
</script>  -->
 
<style lang="qcs" scoped>

</style>
