import {defineStore} from 'pinia'

export const axiosStore = defineStore({
  id: 'axios',
  state: () => ({
    axiosCancel: [] as any[],
  }),
  actions: {
    pushAxiosCancel(cancelItem: any) {
      this.axiosCancel.push(cancelItem)
    },
    resetAxiosCancel() {
      this.axiosCancel = []
    },
    deleteByIndex(index: number) {
      delete this.axiosCancel[index]
    },
  },
})
