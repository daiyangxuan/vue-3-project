import {ref} from 'vue'

import {StrictUseAxiosReturn} from '../types/request'

import type {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource, Method} from 'axios'
import axios from 'axios'
import {message} from 'ant-design-vue'
type IParams = {
  showMesssage?: boolean
  success?: string
  error?: string
}

export function useAxios<T = any>(service: any, params: IParams = {}): StrictUseAxiosReturn<T> {
  const response = ref<AxiosResponse<T>>()
  const data = ref<T>()
  const isFinished = ref(false)
  const isLoading = ref(false)
  const aborted = ref(false)
  const error = ref(false)

  const cancelToken: CancelTokenSource = axios.CancelToken.source()
  const abort = (message?: string) => {
    if (isFinished.value || !isLoading.value) return

    cancelToken.cancel(message)
    aborted.value = true
    isLoading.value = false
    isFinished.value = false
  }
  const loading = (loading: boolean) => {
    isLoading.value = loading
    isFinished.value = !loading
  }
  const getData: StrictUseAxiosReturn<T>['getData'] = async (config: any) => {
    loading(true)
    try {
      const res: any = await service(config)
      // console.log("res", res)
      response.value = res.data
      data.value = res.data
      if (res.code == 200) {
        error.value = false
      } else {
        error.value = true
      }
      // if (params.showMesssage) {
      //   message.success(params.success || "操作成功");
      // }
    } catch (err: any) {
      error.value = true
      data.value = undefined
    } finally {
      loading(false)
    }
  }

  const result = {
    response,
    data,
    error,
    finished: isFinished,
    loading: isLoading,
    isFinished,
    isLoading,
    cancel: abort,
    canceled: aborted,
    aborted,
    abort,
    getData,
  } as StrictUseAxiosReturn<T>

  // function waitUntilFinished() {
  //   return new Promise<StrictUseAxiosReturn<T>>((resolve, reject) => {
  //     until(isFinished)
  //       .toBe(true)
  //       .then(() => resolve(result))
  //       .catch((error: AxiosError) => reject(error));
  //   });
  // }

  return {
    ...result,
    // then(onFulfilled, onRejected) {
    //   return waitUntilFinished().then(onFulfilled, onRejected);
    // },
  }
}
