// import { NodeItem } from "@/types/tree";
import {RowItem, IPwParams, CreateName} from '../types/user'
import service from './request'

export const passwordRule = () => {
  return service.put('/srp-sys/users/passwordRule')
}
export const getUserList = (nodeId: string) => service.get('/srp-sys/users', {params: {nodeId}})

export const updateUser = (params: RowItem) => {
  const {id, ...data} = params
  return id ? service.put(`/srp-sys/users/${id}`, data) : service.post('/srp-sys/users', data)
}

export const queryUser = (params: RowItem) => {
  return service.get(`/srp-sys/users/query`, {params})
}

export const userLeave = (userId: string) => {
  return service.post(`/srp-sys/users/leave/${userId}`)
}

export const resetPassward = (data: IPwParams) => {
  return service.put('/srp-sys/users/resetPassword', data)
}
export const changePassward = (data: IPwParams) => {
  return service.put('/srp-sys/users/changePassword', data)
}

export const getUserInfo = () => service.get('/srp-sys/users/current')

export const getOrgStructure = () => service.get('/srp-sys/orgs/structure')

export const postUpdate = ({postId, ...data}: RowItem) => service.put(`/srp-sys/posts/${postId}`, data)

export const depUpdate = ({depId, ...data}: RowItem) => service.put(`/srp-sys/deps/${depId}`, data)

export const orgUpdate = ({orgId, ...data}: RowItem) => service.put(`/srp-sys/orgs/${orgId}`, data)

export const postAdd = (data: {[key: string]: string}) => service.post('/srp-sys/posts', data)

export const depAdd = (data: {[key: string]: string}) => service.post('/srp-sys/deps', data)

export const orgAdd = (data: {[key: string]: string}) => service.post('/srp-sys/orgs', data)

export const checkPostExist = (id: string) => service.get(`/srp-sys/posts/exist/${id}`)

export const checkDepExist = (id: string) => service.get(`/srp-sys/deps/exist/${id}`)

export const checkOrgExist = (id: string) => service.get(`/srp-sys/orgs/exist/${id}`)

export const deletePost = (id: string) => service.delete(`/srp-sys/posts/${id}`)

export const deleteDep = (id: string) => service.delete(`/srp-sys/deps/${id}`)

export const deleteOrg = (id: string) => service.delete(`/srp-sys/orgs/${id}`)

export const getOrgList = () => service.get('/srp-sys/orgs')

export const getDepList = (rootId: string) => service.get('/srp-sys/orgs/tree', {params: {rootId, nodeType: 'dep'}})

export const getPostList = (rootId: string) => service.get('/srp-sys/orgs/tree', {params: {rootId, nodeType: 'post'}})

export const getQueryUser = (userId: string) => service.get(`/srp-sys/users/${userId}`)

export const updatePic = (data: {userId?: string; headPic?: string}) => service.put('/srp-sys/users/headPic', data)

export const updateMobile = (data: {userId?: string; mobile?: string}) => service.put('/srp-sys/users/mobile', data)

export const getRoleList = (orgId: string) => service.get('/srp-sys/roles/names', {params: {orgId}})

// 校验相关api
export const checkOrgName = (data: {orgName: string; orgId: string}) => service.post('/srp-sys/orgs/check/name', data)

export const checkDepName = (data: {depId: string; orgId: string; depName: string}) =>
  service.post('/srp-sys/deps/check/name', data)

export const checkPostName = (data: {depId: string; orgId: string; postId: string; postName: string}) =>
  service.post('/srp-sys/posts/check/name', data)

export const checkRoleName = (data: {orgId: string; roleId: string; roleName: string}) =>
  service.post('/srp-sys/roles/check/name', data)

export const checkName = (data: {userId: string; username: string}) => service.post('/srp-sys/users/check/name', data)

export const checkPwd = (data: {password: string}) => service.post('/srp-sys/users/check/password', data)
