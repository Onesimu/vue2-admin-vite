import store from '@/store'
// name = store.getters.name
export default {
  setup: -> 
    name = 'adfja'
    console.log 1
    console.log(name)
    {name: name}
}