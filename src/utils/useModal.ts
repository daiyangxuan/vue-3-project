import {ref, reactive} from 'vue'

export const useModal = (defaultParams: any = {}) => {
  const visible = ref<boolean>(false)
  const params = ref<any>(defaultParams)
  const open = (value: any) => {
    params.value = value
    visible.value = true
  }

  const cancel = () => {
    params.value = {}

    visible.value = false
  }

  return {
    visible,
    open,
    cancel,
    params,
  }
}
