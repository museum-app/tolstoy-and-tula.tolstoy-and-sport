import Vue from 'vue'
import Vuex from 'vuex'

import lang from './data/lang'
import dictionary from './data/dictionary'
import content from './data/content'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { lang, dictionary, content }
})