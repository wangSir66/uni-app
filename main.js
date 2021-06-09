import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import api from './utils/api.js'
import customEnum from './utils/enum.js'
import store from './store/index.js'

Vue.use(uView)
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$customEnum = customEnum
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
