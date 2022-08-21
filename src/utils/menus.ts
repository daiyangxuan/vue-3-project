import _ from 'lodash'
import type {MenuItem} from '../types/tree'

const privateTree = new WeakMap()

const toProxy = (data: any) => {
  return new Proxy(data, {
    get(target, key) {
      return target[key]
    },
    set(target, key) {
      console.log('不能对[' + key.toString() + ']赋值.')
      return true
    },
  })
}

export default class Menu {
  static deepToProxy(treeData: MenuItem[], data: MenuItem[]) {
    _.map(treeData, (item: MenuItem) => {
      const {menus, ...args} = item
      data.push(toProxy(args))

      if (menus) {
        Menu.deepToProxy(menus, data)
      }
    })
  }

  static of(treeData: MenuItem[]) {
    const data: MenuItem[] = []
    Menu.deepToProxy(treeData, data)
    return new Menu(data, treeData)
  }

  constructor(list: MenuItem[], treeData: MenuItem[]) {
    privateTree.set(this, {
      menuTree: treeData,
      list,
      currentList: null,
    })
  }

  getOperation() {
    const _state = privateTree.get(this)
    return _.chain(_state.list)
      .filter((item: any) => item.type === 'OPERATION')
      .map((item: any) => item.operationKey)
      .value()
  }
  getMenus() {
    const _state = privateTree.get(this)
    const deepMenu = (menus: MenuItem[]): any => {
      return _.map(menus, (item: any) => {
        return {
          title: item.name,
          id: item.id,
          type: 'sub-menu',
          children: deepMenu(item.menus),
        }
      })
    }

    return deepMenu(_state.menuTree)
  }
}
