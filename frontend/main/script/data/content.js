export default {
  state: {
    poster: {
      ru: {},
      en: {}
    },
    video: {
      ru: getRu(),
      en: getEn()
    }
  },

  mutations: {
    'set-poster': setPoster
  }
}

// state
function getRu () {
  return []
}

function getEn () {
  return []
}


// mutations
function setPoster (state, {key, id, poster}) {
  state.poster[key][id] = poster
}