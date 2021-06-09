import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user.js'
import version from './modules/version.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    user,
	version
  },
  getters,
  strict:debug
})

export default store
