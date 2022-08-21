import type {IUpdateParams} from '../types/role'
import service from './request'
import _ from 'lodash'
import {Modal} from 'ant-design-vue'
import router from '../router'

export const getMenus = () => service.get('/srp-sys/menus/all')

export const getRoleList = (orgId: string) => service.get('/srp-sys/roles', {params: {orgId}})

export const checkRolseName = (data: {orgId: string | undefined; roleName: string}) =>
  service.post('/srp-sys/roles/exist/roleName', data)

export const updateRole = (data: IUpdateParams) => {
  const {roleId, ...args} = data
  return roleId ? service.put(`/srp-sys/roles/${roleId}`, data) : service.post('/srp-sys/roles', args)
}

export const queryPermission = (roleId: string) => service.get(`/srp-sys/roles/${roleId}/permission`)

export const deleteRole = (roleId: string) => service.delete(`/srp-sys/roles/${roleId}`)

export const checkRole = _.throttle((menuId: string) => {
  if (menuId) {
    menuId &&
      service.get(`/srp-sys/menus/have/${menuId}`).then(res => {
        console.log('have menus', res)
        if (!res) {
          Modal.confirm({
            title: '暂无权限',
            content: '检测到暂无该权限！请刷新浏览器以获取到最新的权限内容',
            okText: '立即刷新',
            cancelText: '稍后再说',
            centered: true,
            onOk: () => {
              router.go(0)
            },
          })
        }
      })
  }
  return menuId && service.get(`/srp-sys/menus/have/${menuId}`)
}, 1000)
