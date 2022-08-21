<template>
  <a-spin :spinning="!(menu.length || userStore.userInfo.id)" tip="加载中...">
    <div :class="showPassword ? 'main filter' : 'main'">
      <SjBasicLayout :menu="menu">
        <template #tab-after>
          <div class="user">
            <div class="hover-div">
              <icon-font :size="20" type="icon-shuaxin" class="icon-hover" @click="userStore.changeReloadTag" />
            </div>
            <!--            <div style="margin-right: 14px; height: 32px">-->
            <!--              <TaskPanelDropdown />-->
            <!--            </div>-->
            <icon-font style="margin-right: 14px" :size="20" type="icon-tongzhi1" class="icon-hover" />
            <UserPopover />
          </div>
        </template>
      </SjBasicLayout>
      <ChangePassword :visible="visible" :is-create="true" @cancel="handleCancel" />
    </div>
  </a-spin>
</template>

<script setup lang="ts">
import _ from 'lodash'
import {computed, onMounted, reactive, ref, watchEffect} from 'vue'
import {DesktopOutlined} from '@ant-design/icons-vue'
import {Modal} from 'ant-design-vue'
// import UserPopover from '@/components/UserPopover/UserPopover.vue'
import SjBasicLayout from '@vue3Base/SjBasicLayout'
// import ChangePassword from '@/components/ChangePassword/ChangePassword.vue'
import router from 'src/router'
import {useUserStore} from 'src/store/index'
import type {MenuInfo} from '@vue3Base/types'
import {useModal} from 'src/utils/useModal'
import SettingIcon from 'src/components/SettingIcon.vue'
import SystemIcon from 'src/components/SystemIcon.vue'
import ReportIcon from 'src/components/ReportIcon.vue'
import StockIcon from 'src/components/StockIcon.vue'
import SimulationIcon from 'src/components/SimulationIcon.vue'
import {Item} from 'ant-design-vue/lib/menu'
// 加载任务列表组件
// import TaskPanelDropdown from 'center_project/TaskPanelDropdown'
const {visible, open, cancel} = useModal()

const userStore = useUserStore()

const token = ref<string | null>(localStorage.getItem('token'))

const handleCancel = async () => {
  await userStore.getUserInfo()

  cancel()
  router.replace('/')
}

onMounted(async () => {
  await userStore.getUserInfo()
})
const showPassword = computed(() => {
  return userStore.userInfo?.changePassword
})

watchEffect(() => {
  if (showPassword.value) {
    open({})
  }

  if (!token.value) {
    router.push('/login')
  }
})

router.beforeEach((to, from, next) => {
  Modal.destroyAll()
  if (to.name !== 'login') {
    !userStore.userInfo?.id && userStore.getUserInfo()
  }

  next()
})

let menuInfo: MenuInfo[] = [
  {
    title: '模拟组合',
    icon: SimulationIcon,
    id: 'simulation',
    type: 'sub-menu',
    children: [
      {
        title: '模拟组合列表',
        // icon: DesktopOutlined,
        id: 'simulationList',
        type: 'menu-item',
        fullPath: '/simulationList',
      },
      {
        title: '组合标的汇总',
        // icon: DesktopOutlined,
        id: 'simulationTarget',
        fullPath: '/simulationTarget',
        type: 'menu-item',
      },
    ],
  },
  {
    title: '证券中心',
    icon: StockIcon,
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
    icon: ReportIcon,
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
            id: 'CenterList',
            type: 'menu-item',
            fullPath: '/CenterList',
          },
          {
            title: '我的历史研报',
            // icon: DesktopOutlined,
            id: 'historyReport',
            fullPath: '/historyReport',
            type: 'menu-item',
          },
          {
            title: '研报上传',
            // icon: DesktopOutlined,
            id: 'updateReport',
            fullPath: '/updateReport',
            type: 'menu-item',
          },
        ],
      },
    ],
  },
  {
    title: '设置中心',
    icon: SettingIcon,
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
            id: 'InnerReportTypeSetting',
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
          {
            title: '组合权限设置',
            // icon: DesktopOutlined,
            id: 'permissionSetting',
            fullPath: '/permissionSetting',
            type: 'menu-item',
          },
        ],
      },
    ],
  },
  {
    title: '系统',
    icon: SystemIcon,
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
const contains = (arr: [], item: string) => {
  if (!arr) return false
  for (let x in arr) {
    if (arr[x] === item) {
      return true
    }
  }
  return false
}

const substract = (menuTree: MenuInfo[], authList: string[]) => {
  authList.forEach((item: string, index: number) => {
    if (item === '上传研报') {
      authList[index] = '研报上传'
    }
  })
  // console.log(menuTree, authList);
  if (!menuTree) return

  for (let i = 0; i < menuTree.length; i++) {
    const subMenu = menuTree[i]

    // 优先向下层递归
    /*if(subMenu.children  && subMenu.children.length > 0) {
      substract(subMenu.children, authList);
    }

    // 如果子节点不是0个 则表示子节点有元素存在，那么就不能删除当前节点了
    if(!subMenu.children || subMenu.children.length == 0) {
      // 如果当前节点不是菜单项(没有子项)，或者当前节点不在权限列表内 则移除此元素
      if(subMenu.type !== 'menu-item' || !contains(authList, subMenu.title)) {
        menuTree.splice(i, 1);
        i--;
      }
    }*/

    if (!contains(authList, subMenu.title)) {
      menuTree.splice(i, 1)
      i--
    } else {
      substract(subMenu.children, authList)

      if (subMenu.type !== 'menu-item' && (!subMenu.children || subMenu.children.length == 0)) {
        menuTree.splice(i, 1)
        i--
      }
    }
  }
}

const menu: MenuInfo[] = reactive<MenuInfo[]>([])

const subscribe = userStore.$subscribe(
  (mutation, state) => {
    /*
  * mutation主要包含三个属性值：
  *   events：当前state改变的具体数据，包括改变前的值和改变后的值等等数据
  *   storeId：是当前store的id
  *   type：用于记录这次数据变化是通过什么途径，主要有三个分别是
  *         “direct” ：通过 action 变化的
            ”patch object“ ：通过 $patch 传递对象的方式改变的
            “patch function” ：通过 $patch 传递函数的方式改变的
  *
  * */
    if (userStore.menusList) {
      // menuInfo = _.filter(menuInfo, (item) =>
      //     _.includes(toRaw(userStore.menusList), item.title)
      // );
      substract(menuInfo, userStore.menusList as [])
      // console.log(menuInfo);
      // 模拟组合开发临时增加
      menuInfo.push(
        ...[
          {
            title: '我的研报得分',
            icon: DesktopOutlined,
            id: 'MyReportScore',
            fullPath: '/MyReportScore',
            type: 'menu-item',
          },
          {
            title: '内部研报得分',
            icon: DesktopOutlined,
            id: 'CentInnerReportScoreerDetail',
            fullPath: '/InnerReportScore',
            type: 'menu-item',
          },
        ],
      )
      // reactive值更新视图
      menu.push(...menuInfo)
    }
    subscribe()
  },
  {detached: false},
)
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

.hover-div {
  margin-right: 6px;
  padding: 8px;
  height: 32px;
  display: flex;
  align-items: center;
  border-radius: 2px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
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
