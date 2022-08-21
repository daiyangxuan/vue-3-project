import type {Ref, ShallowRef} from 'vue-demi'
import {ref, shallowRef} from 'vue-demi'
import {until} from '@vueuse/shared'

export interface UseAxiosReturn<T> {
  response: ShallowRef<AxiosResponse<T> | undefined>
  data: Ref<T | undefined>
  isFinished: Ref<boolean>
  isLoading: Ref<boolean>
  aborted: Ref<boolean>
  error: ShallowRef<AxiosError<T> | undefined>
  abort: (message?: string | undefined) => void
  finished: Ref<boolean>
  loading: Ref<boolean>
  cancel: (message?: string | undefined) => void
  canceled: Ref<boolean>
}

export interface UseAxiosOptions {
  immediate?: boolean
}

export interface StrictUseAxiosReturn<T> extends UseAxiosReturn<T> {
  getData: (config?: AxiosRequestConfig) => void
}
