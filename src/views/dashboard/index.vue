<template lang="pug">
div.e2(a='1' b) hello $name s
</template>

<!-- <script setup>
  import store from '@/store'

  const name = store.getters.name
  console.log(name)
</script> -->

<script lang="ls" setup>
import store from '@/store'
name = store.getters.name
o name
</script>

<!-- <script lang="ls">
  export default {}
</script>  -->
 
<style>
  :root { --c: #409EFF; --bdc: #DCDFE6 }
</style> 
<style qcs scoped>
  .e2 { bg: --c bd: 1 s --bdc m: 20 ta: c}
</style>
