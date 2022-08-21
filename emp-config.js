const PluginVue3 = require('@efox/plugin-vue-3')
const {defineConfig} = require('@efox/emp')
const Components = require('unplugin-vue-components/webpack')
// import AutoImport from 'unplugin-auto-import/dist/webpack.js'
const {
  ElementPlusResolver,
  AntDesignVueResolver,
  VantResolver,
  HeadlessUiResolver,
  ElementUiResolver,
} = require('unplugin-vue-components/resolvers')
const path = require('path')

console.log('env', process.env)

module.exports = defineConfig(({mode, env}) => {
  const target = 'es5'
  return {
    plugins: [PluginVue3],
    appEntry: 'main.ts',
    server: {
      port: 9002,
      proxy: {
        '^/api': {
          target: process.env.GATEWAY_TARGET,
          changeOrigin: true,
          pathRewrite: {
            '/api': '',
          },
        },
        '/staging': {
          target: process.env.GATEWAY_TARGET,
          changeOrigin: true,
          pathRewrite: {
            '^/staging': '',
          },
        },
        '/prod': {
          target: process.env.GATEWAY_TARGET,
          changeOrigin: true,
          pathRewrite: {
            '^/prod': '',
          },
        },
        '/data_storage': {
          target: process.env.STORAGE_TARGET,
        },
      },
    },
    html: {title: 'EMP Vue3 Project'},
    build: {target},
    empShare: {
      name: 'vue3Project',
      remotes: {
        '@vue3Base': 'vue3Base@http://localhost:9001/emp.js',
      },
      shareLib: {
        vue: 'Vue@https://cdn.jsdelivr.net/npm/vue@3.2.30/dist/vue.global.js',
        dayjs: 'dayjs@https://unpkg.com/dayjs/dayjs.min.js',
        'ant-design-vue': 'antd@https://cdn.jsdelivr.net/npm/ant-design-vue@3.2.0/dist/antd.min.js',
        'vue-router': 'VueRouter@https://unpkg.com/vue-router@4.0.15/dist/vue-router.global.js',
      },
    },
    webpack: {
      devServer: {
        proxy: {
          '/api': {
            target: 'http://172.28.9.62:32191',
            changeOrigin: true,
            pathRewrite: {
              '^/api': '',
            },
          },
          '/staging': {
            target: process.env.GATEWAY_TARGET,
            changeOrigin: true,
            pathRewrite: {
              '^/staging': '',
            },
          },
          '/prod': {
            target: process.env.GATEWAY_TARGET,
            changeOrigin: true,
            pathRewrite: {
              '^/prod': '',
            },
          },
          '/data_storage': {
            target: process.env.STORAGE_TARGET,
          },
        },
      },
    },
    webpackChain(chain) {
      chain.plugin('components').use(
        Components({
          resolvers: [
            AntDesignVueResolver({
              resolveIcons: true,
              importStyle: 'less',
            }),
            ElementPlusResolver(),
            VantResolver(),
            HeadlessUiResolver(),
            ElementUiResolver(),
          ],
          // 指定组件位置，默认是src/components
          dirs: ['src/components'],
          // ui库解析器
          // resolvers: [ElementPlusResolver()],
          extensions: ['vue'],
          // 配置文件生成位置
          dts: 'src/components.d.ts',
          // search for subdirectories
          // 搜索子目录
          deep: true,
          // filters for transforming targets
          include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
          exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/, /[\/].nuxt[\/]/],
        }),
        // AutoImport({
        //   imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
        //   // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
        //   dts: 'src/auto-import.d.ts'
        // }),
      )
    },
  }
})
