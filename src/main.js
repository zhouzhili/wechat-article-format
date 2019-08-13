import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import message from 'ant-design-vue/lib/message'
import 'ant-design-vue/lib/message/style'

import Modal from 'ant-design-vue/lib/modal'
import 'ant-design-vue/lib/modal/style'

import './style/index.scss'

Vue.config.productionTip = false
Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm
Vue.use(Modal)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
