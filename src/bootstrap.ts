import App from './App.vue'
import {createApp} from 'vue'
import router from './router'
import Antd from 'ant-design-vue'
import '@vue3Base/style'
import './assets/style/index.less'
import {createPinia} from 'pinia'

createApp(App).use(createPinia()).use(Antd).use(router).mount('#emp-root')
