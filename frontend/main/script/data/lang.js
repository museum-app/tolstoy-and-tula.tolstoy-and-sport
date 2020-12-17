export default {
  state: {
    blur: false,
    inuse: 'ru',
    current: 'ru',
    available: ['ru', 'en']
  },
  mutations: {
    'set-lang': setLang
  }
}

function setLang(state, lang) {
  if ( !state.available.includes(lang) || state.blur ) return

  state.blur = true
  state.current = lang

  setTimeout(() => {
    state.inuse = lang
    setTimeout(() => {
      state.blur = false
    }, 50)
  }, 250)
}