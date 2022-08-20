<template>
  <div class="main">
    <SjBasicLayout :menu="menu">
      <!--      <template #tab-after>-->
      <!--        <div class="user">-->
      <!--          <div style="margin-right: 14px; height: 32px">-->
      <!--            <TaskPanelDropdown />-->
      <!--          </div>-->
      <!--          <icon-font style="margin-right: 14px" :size="20" type="icon-tongzhi1" class="icon-hover" />-->
      <!--          <UserPopover />-->
      <!--        </div>-->
      <!--      </template>-->
    </SjBasicLayout>
    <!-- <ChangePassword
      @cancel="handleCancel"
      :visible="visible"
      :isCreate="true"
    /> -->
  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import {computed, onMounted, reactive, ref, watch, watchEffect, toRaw, nextTick} from 'vue'
import {DesktopOutlined} from '@ant-design/icons-vue'
import {Modal} from 'ant-design-vue'
// import UserPopover from '@/components/UserPopover/UserPopover.vue'
import SjBasicLayout from '@vue3Base/SjBasicLayout'
// import ChangePassword from '@/components/ChangePassword/ChangePassword.vue'
import router from '../router'
// import {useUserStore} from '@/store/index'
import type {MenuInfo} from '@vue3Base/types'
import {useRoute, useRouter} from 'vue-router'

setInterval(() => {
  console.log('route change', useRoute(), useRouter())
}, 1000)

// import {useModal} from '@/utils/useModal'
// import SettingIcon from '@/views/UserManager/components/SettingIcon.vue'
// import SystemIcon from '@/views/UserManager/components/SystemIcon.vue'
// import ReportIcon from '@/views/UserManager/components/ReportIcon.vue'
// import StockIcon from '@/views/UserManager/components/StockIcon.vue'
// import SimulationIcon from '@/views/UserManager/components/SimulationIcon.vue'
import {Item} from 'ant-design-vue/lib/menu'
// 加载任务列表组件
// import TaskPanelDropdown from 'center_project/TaskPanelDropdown'
// const {visible, open, cancel} = useModal()

// const userStore = useUserStore()

// const token = ref<string | null>(localStorage.getItem('token'))

// const handleCancel = async () => {
//   await userStore.getUserInfo()

//   cancel()
//   router.replace('/')
// }

// onMounted(async () => {
//   await userStore.getUserInfo()
// })
// const showPassword = computed(() => {
//   return userStore.userInfo?.changePassword
// })

// watchEffect(() => {
//   if (showPassword.value) {
//     open({})
//   }

//   if (!token.value) {
//     router.push('/login')
//   }
// })

// router.beforeEach((to, from, next) => {
//   Modal.destroyAll()
//   if (to.name !== 'login') {
//     !userStore.userInfo?.id && userStore.getUserInfo()
//   }

//   next()
// })

// console.log(MenuInfo)

// watch(
//   () => useRoute(),
//   () => {
//     console.log('route change', useRoute())
//   },
//   {immediate: true},
// )

let menu: MenuInfo[] = [
  {
    title: '模拟组合',
    icon: DesktopOutlined,
    id: 'simulation',
    type: 'sub-menu',
    children: [
      {
        title: '模拟组合列表',
        icon: DesktopOutlined,
        id: 'about',
        type: 'menu-item',
        fullPath: '/about',
      },
      // {
      //   title: "组合标的汇总",
      //   icon: DesktopOutlined,
      //   id: "simulationDetail",
      //   fullPath: "/simulationDetail",
      //   type: "menu-item",
      // },
    ],
  },
  {
    title: '证券中心',
    // icon: StockIcon,
    id: 'stockCenter',
    type: 'sub-menu',
    children: [
      {
        title: '证券池',
        id: 'stockPool',
        type: 'menu-group',
        children: [
          {
            title: '证券池管理',
            // icon: DesktopOutlined,
            id: 'poolManage',
            type: 'menu-item',
            fullPath: '/poolManage',
          },
          {
            title: '证券池调整历史',
            // icon: DesktopOutlined,
            id: 'poolHistory',
            fullPath: '/poolHistory',
            type: 'menu-item',
          },
        ],
      },
    ],
  },
  {
    title: '研报中心',
    // icon: ReportIcon,
    id: 'reportCenter',
    type: 'sub-menu',
    children: [
      {
        title: '研报管理',
        id: 'reportManager',
        type: 'menu-group',
        children: [
          {
            title: '研报搜索',
            // icon: DesktopOutlined,
            id: 'reportSearch',
            type: 'menu-item',
            fullPath: '/CenterList',
          },
          {
            title: '我的历史研报',
            // icon: DesktopOutlined,
            id: 'reportHistory',
            fullPath: '/historyReport',
            type: 'menu-item',
          },
          {
            title: '研报上传',
            // icon: DesktopOutlined,
            id: 'reportUpdate',
            fullPath: '/updateReport',
            type: 'menu-item',
          },
        ],
      },
    ],
  },
  {
    title: '设置中心',
    // icon: SettingIcon,
    id: 'settingCenter',
    type: 'sub-menu',
    children: [
      {
        title: '证券管理',
        id: 'stockManage',
        type: 'menu-group',
        children: [
          {
            title: '证券池设置',
            // icon: DesktopOutlined,
            id: 'poolSetting',
            type: 'menu-item',
            fullPath: '/poolSetting',
          },
          {
            title: '证券池类别设置',
            // icon: DesktopOutlined,
            id: 'PoolCategoriesSetting',
            fullPath: '/PoolCategoriesSetting',
            type: 'menu-item',
          },
          {
            title: '证券池优先级设置',
            // icon: DesktopOutlined,
            id: 'PoolPrioritySetting',
            fullPath: '/PoolPrioritySetting',
            type: 'menu-item',
          },
        ],
      },
      {
        title: '研报管理',
        id: 'reportManagement',
        type: 'menu-group',
        children: [
          {
            title: '内部研报类型设置',
            // icon: DesktopOutlined,
            id: 'inReportTypeSet',
            type: 'menu-item',
            fullPath: '/InnerReportTypeSetting',
          },
        ],
      },
      {
        title: '组合管理',
        id: 'simulationManagement',
        type: 'menu-group',
        children: [
          {
            title: '组合类型设置',
            // icon: DesktopOutlined,
            id: 'simulationSetting',
            fullPath: '/simulationSetting',
            type: 'menu-item',
          },
        ],
      },
    ],
  },
  {
    title: '系统',
    // icon: SystemIcon,
    id: 'system',
    type: 'sub-menu',
    children: [
      {
        title: '权限管理',
        id: 'powerPool',
        type: 'menu-group',
        children: [
          {
            title: '用户管理',
            // icon: DesktopOutlined,
            id: 'userManager',
            fullPath: '/userManager',
            type: 'menu-item',
          },
          {
            title: '角色管理',
            // icon: DesktopOutlined,
            id: 'roleManager',
            fullPath: '/roleManager',
            type: 'menu-item',
          },
        ],
      },
    ],
  },
]
/**
 * 判断数组中是否包含给定的值
 * @param {数组} arr
 * @param {值} item
 * @returns
 */
// const contains = (arr: [], item: string) => {
//   if (!arr) return false
//   for (let x in arr) {
//     if (arr[x] === item) {
//       return true
//     }
//   }
//   return false
// }

// const substract = (menuTree: MenuInfo[], authList: []) => {
//   if (!menuTree) return

//   for (let i = 0; i < menuTree.length; i++) {
//     const subMenu = menuTree[i]

//     // 优先向下层递归
//     /*if(subMenu.children  && subMenu.children.length > 0) {
//       substract(subMenu.children, authList);
//     }

//     // 如果子节点不是0个 则表示子节点有元素存在，那么就不能删除当前节点了
//     if(!subMenu.children || subMenu.children.length == 0) {
//       // 如果当前节点不是菜单项(没有子项)，或者当前节点不在权限列表内 则移除此元素
//       if(subMenu.type !== 'menu-item' || !contains(authList, subMenu.title)) {
//         menuTree.splice(i, 1);
//         i--;
//       }
//     }*/

//     if (!contains(authList, subMenu.title)) {
//       menuTree.splice(i, 1)
//       i--
//     } else {
//       substract(subMenu.children, authList)

//       if (subMenu.type !== 'menu-item' && (!subMenu.children || subMenu.children.length == 0)) {
//         menuTree.splice(i, 1)
//         i--
//       }
//     }
//   }
// }

// const menu: MenuInfo[] = reactive<MenuInfo[]>([])

// const subscribe = userStore.$subscribe(
//   (mutation, state) => {
//     /*
//   * mutation主要包含三个属性值：
//   *   events：当前state改变的具体数据，包括改变前的值和改变后的值等等数据
//   *   storeId：是当前store的id
//   *   type：用于记录这次数据变化是通过什么途径，主要有三个分别是
//   *         “direct” ：通过 action 变化的
//             ”patch object“ ：通过 $patch 传递对象的方式改变的
//             “patch function” ：通过 $patch 传递函数的方式改变的
//   *
//   * */
//     if (userStore.menusList) {
//       // menuInfo = _.filter(menuInfo, (item) =>
//       //     _.includes(toRaw(userStore.menusList), item.title)
//       // );
//       substract(menuInfo, userStore.menusList as [])
//       // console.log(menuInfo);
//       // 模拟组合开发临时增加
//       // menuInfo.push(...[
//       //   {
//       //     title: "研报详情",
//       //     icon: DesktopOutlined,
//       //     id: "CenterDetail",
//       //     fullPath: "/CenterDetail",
//       //     type: "menu-item",
//       //   }]);
//       // reactive值更新视图
//       menu.push(...menuInfo)
//     }
//     subscribe()
//   },
//   {detached: false},
// )
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;

  :deep(.ant-layout) {
    background: #fff;
  }

  &.filter {
    filter: blur(4px);
  }

  .user {
    height: 100%;
    display: flex;
    padding-right: 16px;
    align-items: center;
    color: #fff;
    cursor: pointer;
  }
}

.icon-hover {
  // cursor: pointer;
  color: #fff;

  &:hover::before {
    content: '';
    width: 20px;
    height: 20px;
    //background-attachment: rgba(0, 0, 0, 0.1);
  }
}
</style>
