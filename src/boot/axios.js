import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'
import qs from "qs"
import { Loading, QSpinnerGears } from 'quasar'

const api = axios.create({ baseURL: document.location.protocol + '//api.ipairsdo.xin' })
api.interceptors.request.use(
  config => {
    Loading.show({
      spinner: QSpinnerGears,
      html: true,
      message: '正在努力搬砖中...<br>(如果加载时间过长请刷新页面)'
    })
    if (config.method === "post") {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)
api.interceptors.response.use(
  response => {
    Loading.hide();
    return response;
  },
  err => {
    Loading.show({
      spinner: QSpinnerGears,
      html: true,
      backgroundColor: 'red',
      message: '哎呀！有些东西出错了！<br>请尝试刷新网页或联系网站管理员！'
    })
  }
)

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
