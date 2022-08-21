import {ILogin} from '../types/login'
import service from './request'

export const login = (data: ILogin) => service.post('/srp-auth/auth/login', data)

export const logout = () => {
  return service.post('/srp-auth/auth/logout')
}

export const getAuthCode = (data: ILogin) => {
  return service.post('/srp-auth/auth/code', data)
}

export const getSiderMenu = (userId: string) => service.get('/srp-sys/menus', {params: {userId}})

export const refreshSiderMenu = () => service.get('/srp-sys/menus/cache')

export const refreshToken = (data: {refreshToken: string}) => {
  service.post('/srp-auth/auth/refresh', data)
}
