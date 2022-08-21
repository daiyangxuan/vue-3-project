import axios from 'axios'
import {message, Modal} from 'ant-design-vue'
import type {AxiosRequestConfig} from 'axios'
import {specialApi} from '../constant/specialApl'
import router from '../router'

const service = axios.create({
  baseURL: '/api',
  timeout: 60000,
  headers: {},
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: token,
      }
    }
    return config
  },
  error => {
    console.error('request error', error)
    Promise.reject(error)
  },
)

service.interceptors.response.use(
  async res => {
    const {
      data,
      config: {url},
    } = res

    switch (data.code) {
      case 200:
      case 0:
        if (data.data === null && !specialApi.includes(url)) {
          message.success({
            content: '操作成功',
            key: 'success',
          })
        }
        return Promise.resolve(data)

      default:
        if (res.data.code === 444) {
          Modal.confirm({
            title: '暂无权限',
            content: '检测到暂无该权限！请刷新浏览器以获取到最新的权限内容',
            okText: '立即刷新',
            cancelText: '稍后再说',
            centered: true,
            onOk: () => {
              router.go(0)
            },
            onCancel: () => {
              Modal.destroyAll()
            },
          })
          // if (res.data.msg === "该菜单暂无权限!" || res.data.msg === "该菜单暂无权限！") {
          //   router.replace("/444");
          // }
          // if (res.data.msg === "无权限操作！" || res.data.msg === "账户无权限" || res.data.msg === "暂无该菜单权限！") {
          // else {
          // message.error({
          //     content: "权限发生变更，暂无该权限！请刷新浏览器",
          //     duration: 3,
          //     key: "auth",
          // });
          return undefined
          // }
          // router.go(0);
        }
        // 部分校验接口去除message
        if (!specialApi.includes(url)) {
          message.error({
            content: data.msg,
            key: 'error',
          })
        }
        return Promise.reject(data)
    }
  },
  error => {
    const {status, data} = error.response
    switch (status) {
      case 401:
        message.error({
          content: '用户校验超时，请重新登录',
          key: 'error',
        })
        // localStorage.removeItem("token");
        localStorage.clear()
        window.location.hash = '/login'
        break
      default:
        break
    }
    return Promise.reject(error.response.data)
  },
)

export default service
