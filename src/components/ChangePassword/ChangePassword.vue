<template>
  <SjModal
    ref="el"
    title="修改密码"
    :closable="!isCreate"
    :visible="props.visible"
    class="update-pwd-form"
    @cancel="handleCancel"
  >
    <a-form ref="formRef" autocomplete="off" name="form" :label-col="{span: 4, offset: 4}" :model="formState">
      <a-form-item
        label="旧密码"
        name="password"
        :rules="[
          {
            required: true,
            validator: validatorOldPass,
          },
        ]"
        validate-trigger="onBlur"
        :wrapper-col="{span: 12}"
      >
        <a-input v-model:value="formState.password" placeholder="请输入旧密码" :type="passwordType">
          <template #suffix>
            <eye-outlined v-show="flag" @click="switchHandle" />
            <icon-font v-show="!flag" type="icon-no_eye" @click="switchHandle" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        label="新密码"
        autocomplete="new-password"
        :rules="[{required: true, validator: validateNewPass, taget: 'blur'}]"
        name="newPassword"
        :wrapper-col="{span: 12}"
      >
        <a-input
          v-model:value="formState.newPassword"
          :maxlength="50"
          autocomplete="new-password"
          :placeholder="passholder"
          :type="newPasswordType"
        >
          <template #suffix>
            <eye-outlined v-show="newFlag" @click="newSwitchHandle" />
            <icon-font v-show="!newFlag" type="icon-no_eye" @click="newSwitchHandle" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="确认密码"
        name="confirmPassword"
        :rules="[{required: true, validator: validateConfirmPass, taget: 'blur'}]"
        :wrapper-col="{span: 12}"
      >
        <a-input
          v-model:value="formState.confirmPassword"
          :placeholder="passholder"
          :type="confirmPasswordType"
          :maxlength="50"
        >
          <template #suffix>
            <eye-outlined v-show="confirmFlag" @click="confirmSwitchHandle" />
            <icon-font v-show="!confirmFlag" type="icon-no_eye" @click="confirmSwitchHandle" />
          </template>
        </a-input>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button v-if="!isCreate" @click="handleCancel">取消</a-button>
      <a-button
        :disabled="!formState.password || !formState.newPassword || !formState.confirmPassword"
        type="primary"
        @click="handleOk"
        >确定</a-button
      >
    </template>
  </SjModal>
</template>

<script setup lang="ts">
import type {FormInstance} from 'ant-design-vue'
import type {IPwParams} from '../../types/user'

import {message} from 'ant-design-vue'
// import SjModal from '@/components/SjModal/SjModal.vue'
import {defineProps, reactive, ref, toRef, defineEmits, computed, watch} from 'vue'
import {useAxios} from '../../api/base'
import {passwordRule, changePassward} from '../../api/user'
import {createFromIconfontCN} from '@ant-design/icons-vue'

import {
  EyeOutlined,
  // EyeInvisibleOutlined,
} from '@ant-design/icons-vue'

import {checkPwd} from '../../api/user'

interface IProps {
  visible: boolean
  isCreate: boolean
}

const {
  data: checkPwdData,
  error: checkPwdError,
  getData: pwdCheck,
  loading: checkPwdLoading,
} = useAxios(checkPwd, {showMesssage: false})

const formRef = ref<FormInstance>()
const props = defineProps<IProps>()
const formState = reactive<IPwParams>({})
const {data, getData} = useAxios(passwordRule)

let flag = ref(false)
let passwordType = ref('password')
let newFlag = ref(false)
let newPasswordType = ref('password')
let confirmFlag = ref(false)
let confirmPasswordType = ref('password')

const switchHandle = () => {
  if (!flag.value) {
    flag.value = true
    passwordType.value = 'text'
  } else {
    flag.value = false
    passwordType.value = 'password'
  }
}

const newSwitchHandle = () => {
  if (!newFlag.value) {
    newFlag.value = true
    newPasswordType.value = 'text'
  } else {
    newFlag.value = false
    newPasswordType.value = 'password'
  }
}

const confirmSwitchHandle = () => {
  if (!confirmFlag.value) {
    confirmFlag.value = true
    confirmPasswordType.value = 'text'
  } else {
    confirmFlag.value = false
    confirmPasswordType.value = 'password'
  }
}

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'ok', key: string): void
}>()

const handleCancel = () => {
  emit('cancel')
  formRef.value?.resetFields()
}

const handleOk = () => {
  formRef.value?.validateFields().then(async res => {
    await changePassward({
      ...formState,
    })
    message.success('操作成功')

    await handleCancel()
  })
}

const passholder = computed(() => {
  return data.value ? data.value.message : '请输入新密码'
})

const validatorOldPass = async (_rule: any, value: string) => {
  if (!value || value === '') return Promise.reject('请输入旧密码')

  await pwdCheck({password: value})
  // return Promise.resolve();
  if (checkPwdError.value) {
    return Promise.reject('旧密码不正确')
  } else {
    return Promise.resolve()
  }
}

const validateNewPass = async (_rule: any, value: string) => {
  // console.log("validateNewPass", eval(data.value.checkRule).test(value));
  if (value === '') {
    return Promise.reject('请输入新密码')
  } else if (value.length > data.value.maxLength || value.length < data.value.minLength) {
    return Promise.reject(data.value.message)
  } else if (!eval(data.value.checkRule).test(value)) {
    return Promise.reject(data.value.message)
  } else {
    return Promise.resolve()
  }
}

const validateConfirmPass = async (_rule: any, value: string) => {
  if (value === '') {
    return Promise.reject('请输入确认密码')
  } else if (value !== formState.newPassword) {
    return Promise.reject('两次输入密码不一致')
  } else {
    return Promise.resolve()
  }
}

watch(
  () => props.visible,
  (value: boolean) => {
    if (value) {
      getData()
    }
  },
  {immediate: true},
)
</script>

<style lang="less" scoped>
:deep(.ant-btn) {
  font-size: 14px;
}
.update-pwd-form {
  .ant-form {
    :deep(.ant-form-item) {
      &.ant-form-item-with-help {
        margin-bottom: 16px !important;
        .ant-form-item-explain {
          position: static;
        }
      }
    }
  }
}
</style>
