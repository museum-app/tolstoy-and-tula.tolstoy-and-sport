import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showText: true,
    lang: 'rus'
  },

  mutations: {
    'set-lang': setLang,
    'show-text': showText
  }
})


function setLang (state, lang) {
  if ( state.lang === lang )
    return
  
  showText(state, false)
  setTimeout(() => {
    state.lang = lang

    setTimeout(() => {
      showText(state, true)
    }, 50)
  }, 250)
}

function showText (state, show) {
  state.showText = show
}