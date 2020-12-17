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
  return [
    '/video/rus/001-video.mp4'
  ]
}

function getEn () {
  return [
    '/video/eng/001-video.mp4'
  ]
}


// mutations
function setPoster (state, {key, id, poster}) {
  state.poster[key][id] = poster
}