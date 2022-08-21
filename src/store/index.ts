import type {InfoProp} from '../types/user'
import type {NodeItem} from '../types/tree'
import {toRaw} from 'vue'

import {defineStore} from 'pinia'
import {getUserInfo} from '../api/user'
import {useAxios} from '../api/base'
import {getSiderMenu, refreshSiderMenu} from '../api/login'
import {getTreeList, transMenus} from '../utils/recursionMenus'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: {} as InfoProp,
    menus: [] as NodeItem[],
    menusList: undefined as Array<any> | undefined,
    menusAddList: undefined as Array<any> | undefined,
    reloadTag: true as boolean,
  }),
  actions: {
    changeReloadTag() {
      this.reloadTag = !this.reloadTag
    },
    async refreshMenus() {
      const {data: menus, getData: getMenu} = useAxios(refreshSiderMenu)
      await getMenu()

      // 处理权限树
      const menusList: any[] = []
      getTreeList(toRaw(menus.value), menusList)
      const menusAddList = transMenus(menusList)

      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          userInfo: this.$state.userInfo,
          menus: menus.value,
          menusList,
          menusAddList,
        }),
      )
      localStorage.setItem('menuList', JSON.stringify({menusList}))

      this.$patch({
        menus: menus.value,
        menusList,
        menusAddList,
      })
    },
    async getUserInfo() {
      const {data, getData} = useAxios(getUserInfo)
      const {data: menus, getData: getMenu} = useAxios(getSiderMenu)
      await getData()
      await getMenu(data.value.id)

      // 处理权限树
      const menusList: any[] = []
      getTreeList(toRaw(menus.value), menusList)
      const menusAddList = transMenus(menusList)

      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          userInfo: data.value,
          menus: menus.value,
          menusList,
          menusAddList,
        }),
      )

      this.$patch({
        userInfo: data.value,
        menus: menus.value,
        menusList,
        menusAddList,
      })
    },
  },
})
