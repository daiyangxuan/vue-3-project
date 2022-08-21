<template>
  <a-popover
    placement="bottomRight"
    trigger="hover"
    overlay-class-name="user-popover"
    @visibleChange="handleVisibleChange"
  >
    <template #content>
      <div class="user-info">
        <div class="user-info-top">
          <div class="user-info-top-list">
            <div class="user-info-top-list-item">
              <icon-font type="icon-yonghu1" />
              <div class="user-info-top-list-item-info">
                {{ getText('name') }}
              </div>
            </div>
            <div class="user-info-top-list-item">
              <icon-font type="icon-gongsi" />
              <div class="user-info-top-list-item-info">
                {{ getText('orgName') }}
              </div>
            </div>
            <div class="user-info-top-list-item">
              <icon-font type="icon-bumen" />
              <div class="user-info-top-list-item-info">
                {{ getText('depName') }}
              </div>
            </div>
            <div class="user-info-top-list-item">
              <icon-font type="icon-youxiang" />
              <div class="user-info-top-list-item-info">
                {{ getText('email') }}
              </div>
            </div>
            <div v-show="!isEdit" class="user-info-top-list-item">
              <icon-font type="icon-shouji" />
              <div class="user-info-top-list-item-info">
                {{ getText('mobile') }}
              </div>
            </div>
            <div v-show="isEdit" class="user-info-top-list-item">
              <icon-font type="icon-shouji" />
              <div class="user-info-top-list-item-info">
                <a-input v-model:value="mobile" class="popover-input" @pressEnter="handleUpload" @blur="handleUpload" />
              </div>
            </div>
          </div>
          <div v-show="!isEdit" class="user-info-top-upload">
            <img :src="getText('headPic') ? getText('headPic') : headPic" class="upload" alt="" />

            <a-upload name="avatar" accept=".png,.jpg" :show-upload-list="false" :before-upload="beforeUpload">
              <icon-font type="icon-xiangji" class="upload-icon" />
            </a-upload>
            <icon-font type="icon-xiugai" class="edit-icon" @click="intoEdit" />
          </div>
          <div v-show="isEdit" class="user-info-top-upload">
            <img :src="getText('headPic') ? getText('headPic') : headPic" alt="" class="upload" />
            <a-upload name="avatar" accept=".png,.jpg" :show-upload-list="false" :before-upload="beforeUpload">
              <icon-font type="icon-xiangji" class="upload-icon" />
            </a-upload>
            <icon-font type="icon-baocun" class="edit-icon" @click="handleUpload" />
          </div>
        </div>
        <a-divider />
        <div class="user-info-footer">
          <a-button type="text" @click="handleClick">
            <icon-font type="icon-mima" />
            修改密码
          </a-button>
          <a-button type="text" @click="handleLogout">
            <template #icon>
              <icon-font type="icon-tuichu" />
            </template>
            退出登录
          </a-button>
        </div>
      </div>
    </template>
    <div class="user-inner">
      <div class="border-icon">
        <icon-font :size="20" type="icon-yonghu1" color="#fff" />
      </div>
      <div class="user-name">
        {{ getText('name') }}
      </div>
    </div>
  </a-popover>
  <ChangePassword v-model:visible="visible" :is-create="false" @cancel="cancel" />
</template>
<script setup lang="tsx">
import type {InfoProp} from '@/types/user'
import {storeToRefs} from 'pinia'

import headPic from '../../assets/images/headPic.png'
import {FormOutlined, PlusOutlined, ExclamationCircleFilled} from '@ant-design/icons-vue'

import _, {debounce} from 'lodash'
import router from '../../router'
import {computed, createVNode, onMounted, ref, watch} from 'vue'
import {logout} from '../../api/login'
import {updatePic, updateMobile} from '../../api/user'
import {Modal, message} from 'ant-design-vue'
import {useModal} from '../../utils/useModal'
// import ChangePassword from '@/components/ChangePassword/ChangePassword.vue'
import {useUserStore} from '../../store/index'
import {useAxios} from '../../api/base'
import {is} from '@babel/types'

const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)
const isEdit = ref(false)
const mobile = ref()
const {visible, open, cancel} = useModal()
const {data, loading, getData: setHeadPic} = useAxios(updatePic)
const {data: mobileData, loading: mobileLoading, getData: setMobile} = useAxios(updateMobile, {showMesssage: true})

const getText = (type: string) => {
  return _.get(userStore.userInfo, type, '')
}

const handleClick = () => {
  open({mask: true})
}

const intoEdit = () => {
  isEdit.value = true
}

const mobileCache = ref('')
const isMobileChange = computed(() => {
  return mobile.value !== mobileCache.value
})
const handleUpload = debounce(async () => {
  let errMsg = '',
    isOk = true
  if (mobile.value?.length > 0 && !/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(mobile.value)) {
    errMsg = '请输入正确的手机号'
    isOk = false
  }

  if (!isMobileChange.value && mobile.value) {
    errMsg = '手机号未修改'
    isOk = false
  }

  if (!mobile.value) {
    errMsg = '请输入手机号'
    isOk = false
  }
  if (isOk) {
    const userId = userStore.userInfo.id
    userId &&
      (await setMobile({
        userId,
        mobile: mobile.value,
      }))
    await userStore.getUserInfo()
    isEdit.value = false
  } else {
    // mobile.value = userInfo.value.mobile;
    errMsg &&
      message.error({
        content: errMsg,
        key: 'error',
      })
  }
}, 300)
const handleVisibleChange = (visible: boolean) => {
  if (!visible) {
    isEdit.value = false
  }
}

const beforeUpload = (file: File) => {
  // console.log("customRequest", file);
  if (!(file.name?.endsWith('jpg') || file.name?.endsWith('jpeg') || file.name?.endsWith('png'))) {
    message.error({
      content: '仅支持jpg、png格式图片',
      key: 'error',
    })
    // setTimeout(() => {
    //   message.destroy();
    // }, 3000);
    return false
  }
  let baseImg = null
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = async res => {
    const userId = userStore.userInfo.id

    userId &&
      (await setHeadPic({
        userId,
        headPic: res.target?.result,
      }))
    await userStore.getUserInfo()
  }

  return false
}

const handleLogout = () => {
  Modal.confirm({
    centered: true,
    title: '退出登录',
    content: '确定要退出登录吗？',
    icon: createVNode(ExclamationCircleFilled),
    onOk: async () => {
      await logout()
      await userStore.$reset()
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('env')
      router.push('/login')
    },
    okText: '确定',
    cancelText: '取消',
  })
}

watch(userInfo, (n, o) => {
  mobile.value = n.mobile
  mobileCache.value = n.mobile || ''
})
</script>

<style lang="less" scoped>
.user-inner {
  display: flex;
  align-items: center;
  cursor: pointer;

  & .border-icon {
    margin-right: 8px;
    padding: 6px;
    height: 32px;
    display: flex;
    align-items: center;
    border-radius: 2px;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}
.user-info {
  display: flex;
  flex-direction: column;
  .popover-input {
    background-color: #3b4355;
    width: 93px;
    height: 24px;
    border-radius: 2px;
    border: 1px solid #6d84b8;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 20px;
    padding: 2px 14px 2px 4px;
  }
  &-top {
    display: flex;
    justify-content: space-between;
    &-list {
      width: 176px;
      color: rgba(255, 255, 255, 0.85);
      display: flex;
      flex-direction: column;
      &-item {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        .anticon {
          color: rgba(255, 255, 255, 0.65);
          margin-right: 8px;
        }
      }
    }
    &-upload {
      display: flex;
      flex-direction: column;
      .anticon {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.65);
      }
      .upload {
        width: 64px;
        height: 64px;
        border-radius: 32px;
        overflow: hidden;
      }
      .upload-icon {
        margin-top: 10px;
        text-align: center;
        position: relative;
        left: 22px;
      }

      .edit-icon {
        margin-top: 30px;
        text-align: center;
      }
      // :deep(.ant-upload) {
      //   width: 64px;
      //   height: 64px;
      // }
    }
  }
  &-middle {
    display: flex;
    justify-content: space-between;
    &-list {
      width: 176px;
      color: rgba(255, 255, 255, 0.85);
      display: flex;
      flex-direction: column;
      &-item {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        .anticon {
          color: rgba(255, 255, 255, 0.65);
          margin-right: 8px;
        }
      }
    }
  }
  .ant-divider {
    margin: 10px 0 20px;
    border-color: rgba(225, 225, 225, 0.25);
  }
  &-footer {
    display: flex;
    justify-content: space-between;
    .ant-btn-text {
      padding: 0;
      display: flex;
      align-items: center;
      color: rgba(225, 225, 225, 0.85);
      line-height: 1;
      height: 24px;
    }
  }
}
</style>
<style lang="less">
.user-popover {
  padding-top: 0 !important;
  & > .ant-popover-content {
    & > .ant-popover-arrow {
      display: none;
    }
    & > .ant-popover-inner {
      background: #3b4355;
      .ant-popover-inner-content {
        padding: 20px;
      }
    }
  }
  & .user-info-footer {
    & span {
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
