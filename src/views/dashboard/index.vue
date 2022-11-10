<!-- <template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template> -->
<template lang="pug">
div.e2 hello {{name}}
</template>

<!-- <script setup>
  import store from '@/store'

  const name = store.getters.name
  console.log(name)
</script> -->

<script lang="ls" setup>
import store from '@/store'
export default {
  setup: -> 
    name = store.getters.name
    // name = 'adfja'
    console.log 1
    console.log(name)
    {name: name}
}
</script>

<!-- <script lang="ls">
  export default {}
</script>  -->
 
<style lang1="qcs" scoped>
  .e2 { f: 20; w: 80; bg: green; }
</style>
