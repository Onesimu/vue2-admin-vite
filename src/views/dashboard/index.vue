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
  :root { --color-primary: #409EFF; --bdc: #DCDFE6 }
</style> 
<style qcs scoped>
  .e2 { f: 20 w: 180 bg: green bd: 1 s var(--bdc) }
</style>
