import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'ru',
    langList: ['ru', 'en'],
    content: []
  },

  mutations: {
    'set-lang': setLang
  }
})

function setLang (state, lang) {
  if ( state.langList.includes(lang) )
    state.lang = lang

  // console.log('cuurent lang', )
}