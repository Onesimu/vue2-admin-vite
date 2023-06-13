// import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import { createProdMockServer } from 'vite-plugin-mock/client'
import table from './table'
import user from './user'

const mocks = [...table, ...user]
export function setupProdMockServer(prefix) {
  // mocks.forEach(api => {
  //   if (api.url) api.url = prefix + api.url
  // })
  createProdMockServer(mocks)
}