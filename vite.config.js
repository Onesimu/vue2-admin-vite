import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import compressPlugin from 'vite-plugin-compression'
// import legacy from '@vitejs/plugin-legacy'
import qcs from './dev/qcs/index.js'
// const livescript = require('rollup-plugin-livescript')
import ls from './dev/ls.js'

// compress: 'gzip' | 'brotli' | 'none'
function configCompressPlugin(isBuild, compress) {
  const plugins = []
  if (!isBuild) return plugins
  const compressList = compress.split(',')
  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
    )
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'brotliCompress',
        ext: '.br'
      })
    )
  }
  return plugins
}

export default ({ mode }) => {
  const isBuild = mode === 'production' // mode == production
  const port = loadEnv(mode, process.cwd()).PORT || 3000 // dev port
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      ls(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),
      // legacy({
      //   targets: ['ie >= 11'],
      //   additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      // }),
      ...configCompressPlugin(isBuild, 'gzip')
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    base: '/',
    server: {
      port,
      // open: true,
      hmr: { overlay: false }
    },
    css: {
      postcss: {
        plugins: [qcs]
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'static',
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) { // 静态资源分拆打包
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isBuild, // 打包时删除log
          drop_debugger: isBuild, // 打包时删除debugger
          pure_funcs: isBuild ? ['console.log'] : []
        },
        output: {
          comments: isBuild // 去掉注释
        }
      }
    }
  })
}
