import {powerMap} from '../constant/userPower'
import _ from 'lodash'

export const getTreeList = (tree: Array<any>, treeList: Array<any>): void => {
  tree.forEach(item => {
    treeList.push(item.name)
    if (item.menus) {
      getTreeList(item.menus, treeList)
    }
  })
}

export const transMenus = (list: Array<any>) => {
  const result = list.concat()
  result
    .map(item => {
      powerMap.forEach(o => {
        if (item === o.menu) {
          result.push(o.show)
        }
      })
    })
    .filter((i, index, arr) => arr.indexOf(i) === index)
  return result
}

export const getOrderList = (
  list: Array<any>,
  url: string,
  menuObj: {parentId: Array<string>; menuList: Array<string>},
) => {
  list.forEach(item => {
    if (item.url === url) {
      menuObj.parentId.push(item.id)
      item.menus.forEach((element: {id: string}) => {
        menuObj.menuList.push(element.id)
      })
    }
    if (item.menus) {
      getOrderList(item.menus, url, menuObj)
    }
  })
}

// 根据菜单寻找对应id
let menuId = ''
export const getMenuId = (menu: Array<any>, menuName: string) => {
  try {
    menu.forEach(item => {
      if (item.name === menuName) {
        menuId = item.id
        throw new Error('退出foreach')
      }
      if (item.menus) {
        getMenuId(item.menus, menuName)
      }
    })
    return menuId
  } catch (e) {
    return menuId
  }
}
