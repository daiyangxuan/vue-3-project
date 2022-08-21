import _ from 'lodash'
import type {NodeItem} from '../types/tree'

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

export default class Tree {
  static deepToProxy(treeData: NodeItem[], data: NodeItem[], parent: NodeItem) {
    _.map(treeData, (item: NodeItem) => {
      const {nodes, menus, ...args} = item
      data.push(toProxy(item))
      const children = nodes || menus
      if (children) {
        Tree.deepToProxy(children, data, args)
      }
    })
  }

  static of(treeData: NodeItem[]) {
    const data: NodeItem[] = []
    Tree.deepToProxy(treeData, data, {id: '0'})
    return new Tree(data, treeData)
  }

  constructor(list: NodeItem[], treeData: NodeItem[]) {
    privateTree.set(this, {
      treeData,
      list,
      currentList: null,
    })
  }

  findData(treeItem: NodeItem, fn: any, list: NodeItem[]) {
    // const _state = privateTree.get(this);
    const data = _.find(list, (item: NodeItem) => item.id === treeItem.parentId)
    if (data) {
      fn(data)
      this.findData(data, fn, list)
    } else {
      return
    }
  }

  getTreeList(key: any) {
    const _state = privateTree.get(this)
    const node = _.find(_state.list, item => item.id === key)

    const list: NodeItem[] = [node]
    if (node) {
      const fn = (data: NodeItem) => {
        list.push(data)
      }

      this.findData(node, fn, _state.list)
      _state.currentList = list
    }

    return this
  }

  value() {
    const _state = privateTree.get(this)
    return _.cloneDeep(_state.currentList)
  }

  getTree() {
    const _state = privateTree.get(this)
    return _.cloneDeep(_state.treeData)
  }

  getParent() {
    const _state = privateTree.get(this)

    const dep = _.find(_state.currentList, item => item.nodeType === 'dep')
    const org = _.find(_state.currentList, item => item.nodeType === 'org')
    const post = _.find(_state.currentList, item => item.nodeType === 'post')
    return {
      dep,
      org,
      post,
    }
  }

  getExpandKey() {
    const _state = privateTree.get(this)
    return _.map(_state.currentList, item => item.id)
  }

  getInitExpandKey(id: string | undefined, flag: boolean | undefined) {
    const _state = privateTree.get(this)
    console.log('getInitExpandKey', id, flag)
    if (flag) {
      return id ? _.map(_state.currentList, item => item.id) : []
    }
    return _.chain(_state.list)
      .filter(item => {
        // console.log(
        //   _.size(item.nodes) || _.size(item.menus),
        //   _.size(item.nodes),
        //   _.size(item.menus),
        //   _state.list
        // );

        return _.size(item.nodes) || _.size(item.menus)
      })
      .map(item => item.id)
      .value()
  }

  getSelectKey(deleteKey: string, selectKey: string) {
    const _state = privateTree.get(this)

    const index = _.findIndex(_state.currentList, (item: NodeItem) => item.id === deleteKey)
    if (~index) {
      return _.get(_state.currentList, `[${index + 1}].id`)
    } else {
      return selectKey
    }
  }

  getPostOption(parentId: string) {
    const _state = privateTree.get(this)
    const disabledList = [] as string[]

    const fn = (ids: string[]) => {
      const list = _.filter(_state.list, item => _.includes(ids, item.parentId) && item.nodeType === 'post').map(
        item => item.id,
      )
      if (_.size(list)) {
        disabledList.push(...list)
        fn(list)
      }
    }
    fn([parentId])

    return _.chain(_state.list)
      .filter(item => item.nodeType === 'post')
      .map(item => {
        return {
          value: item.nodeName,
          disabled: _.includes(disabledList, item.id),
        }
      })
      .sortBy(item => {
        return !item.disabled
      })
      .uniqWith((arrVal, othVal) => {
        return arrVal.value === othVal.value
      })
      .reverse()
      .value()
  }

  getRoleParams(selectKey: string[]) {
    const _state = privateTree.get(this)
    const menuIds = [] as string[]
    const operationIds = [] as string[]

    _.map(selectKey, item => {
      const node = _.find(_state.list, d => d.id === item)
      // console.log("getRoleParams", menuIds, operationIds, selectKey, node);

      _.get(node, 'type') === 'MENU' && menuIds.push(item)
      _.get(node, 'type') === 'OPERATION' && operationIds.push(item)
    })

    return {
      menuIds,
      operationIds,
    }
  }

  getChildren(node: NodeItem) {
    const ids = [node.id]

    const deepChild = (chids: NodeItem[] | undefined) => {
      _.map(chids, item => {
        ids.push(item.id)
        if (item.menus) {
          deepChild(item.menus)
        }
      })
    }
    deepChild(node.menus)
    return ids
  }

  getParentKey(node: NodeItem) {
    if (!node.parentId) return []
    this.getTreeList(node.id)
    const _state = privateTree.get(this)
    return _.map(_state.currentList, item => item.id)
  }
}
