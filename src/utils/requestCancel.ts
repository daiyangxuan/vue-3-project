// import axios from "axios";
// import { axiosStore } from "@/store/axios";

// axios.interceptors.request.use(
//   (config) => {
//     console.log(config);
//     // 添加取消标记
//     config.cancelToken = new axios.CancelToken((cancel: any) => {
//       axiosStore().pushAxiosCancel(cancel);
//       console.log(axiosStore().axiosCancel);
//     });
//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

// export default axios;
