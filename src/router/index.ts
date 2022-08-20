import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import {defineAsyncComponent} from 'vue'
import MainView from '../views/MainView.vue'
import TestView from '../views/Test'
import AboutView from '@vue3Base/AboutView'
import createAsyncRouterView from '@vue3Base/createAsyncRouterView'

const HomeView = defineAsyncComponent(() => import('@vue3Base/HomeView'))
// const AboutView = defineAsyncComponent(() => import('@vue3Base/AboutView'))
const View404 = defineAsyncComponent(() => import('@vue3Base/View404'))

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/main',
    name: 'main',
    component: MainView,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomeView,
      },
      {
        path: '/about',
        name: 'about',
        component: createAsyncRouterView(() => import('@vue3Base/AboutView')),
      },
      {
        path: '/poolManage',
        name: 'poolManage',
        component: TestView,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: View404,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
