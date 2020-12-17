const list = []

export default {
  state: {
    poster: {
      ru: {},
      en: {}
    },
    video: {
      ru: getFor('rus'),
      en: getFor('eng')
    }
  },

  mutations: {
    'set-poster': setPoster
  }
}


// state
function getFor (lang) {
  const result = []
  
  list.forEach(video => {
    const path = video.replace('%lang%', lang)
    result.push(path)
  })

  return result
}


// mutations
function setPoster (state, {key, id, poster}) {
  state.poster[key][id] = poster
}