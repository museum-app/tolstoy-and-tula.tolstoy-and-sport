export default {
  state: {
    poster: {
      ru: {},
      en: {}
    },
    video: {
      ru: getForeng(),
      en: getForEng()
    }
  },

  mutations: {
    'set-poster': setPoster
  }
}


// state
function getForeng () {
  return [
    '/video/rus/001-video.mp4', '/video/rus/002-video.mp4', '/video/rus/003-video.mp4',
    '/video/rus/004-video.mp4', '/video/rus/005-video.mp4', '/video/rus/006-video.mp4',
    '/video/rus/007-video.mp4', '/video/rus/008-video.mp4', '/video/rus/009-video.mp4',
    '/video/rus/010-video.mp4', '/video/rus/011-video.mp4', '/video/rus/012-video.mp4',
    '/video/rus/013-video.mp4', '/video/rus/014-video.mp4', '/video/rus/015-video.mp4',
    '/video/rus/016-video.mp4', '/video/rus/017-video.mp4', '/video/rus/018-video.mp4',
    '/video/rus/019-video.mp4', '/video/rus/020-video.mp4', '/video/rus/021-video.mp4',
    '/video/rus/022-video.mp4', '/video/rus/023-video.mp4', '/video/rus/024-video.mp4',
    '/video/rus/025-video.mp4', '/video/rus/026-video.mp4', '/video/rus/027-video.mp4',
    '/video/rus/028-video.mp4'
  ]
}

function getForEng () {
  return [
    '/video/eng/001-video.mp4', '/video/eng/002-video.mp4', '/video/eng/003-video.mp4',
    '/video/eng/004-video.mp4', '/video/eng/005-video.mp4', '/video/eng/006-video.mp4',
    '/video/eng/007-video.mp4', '/video/eng/008-video.mp4', '/video/eng/009-video.mp4',
    '/video/eng/010-video.mp4', '/video/eng/011-video.mp4', '/video/eng/012-video.mp4',
    '/video/eng/013-video.mp4', '/video/eng/014-video.mp4', '/video/eng/015-video.mp4',
    '/video/eng/016-video.mp4', '/video/eng/017-video.mp4', '/video/eng/018-video.mp4',
    '/video/eng/019-video.mp4', '/video/eng/020-video.mp4', '/video/eng/021-video.mp4',
    '/video/eng/022-video.mp4', '/video/eng/023-video.mp4', '/video/eng/024-video.mp4'
  ]
}


// mutations
function setPoster (state, {key, id, poster}) {
  state.poster[key][id] = poster
}