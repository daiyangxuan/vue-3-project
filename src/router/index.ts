import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import {defineAsyncComponent} from 'vue'
import MainView from '../views/MainView.vue'
// import TestView from '../views/Test'
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
        component: createAsyncRouterView(() => import('../views/Test')),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
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

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  if (from.path === '/' && to.path != '/home') {
    next('/home')
  }
  next()
})

export default router
