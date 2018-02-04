import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'normalize.css/normalize.css'

Vue.config.productionTip = false

// 添加响应拦截器
axios.interceptors.response.use(function (res) {
  // 对响应数据做些事
  return res.data
}, function (error) {
  // 请求错误时做些事
  return Promise.reject(error)
})

Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
