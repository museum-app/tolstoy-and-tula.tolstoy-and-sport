<template lang='pug'>
    
  body#body
    Main( ref='main' @next='next' )
    Content( v-if='ready' ref='content' @prev='prev' )

    div( v-if='video' class='player-div full flex-center' :class='{ show }' )
      video( class='player' :src='video' ref='player' autoplay loop )

      div( class='gallery-button flex-center' @click='close' )
        GalleryIcon
        span( class='gallery-text' ) Галерея


</template>

<script>
import Main from ':main/view/Main'
import Content from ':main/view/Content'

import GalleryIcon from ':main/component/GalleryIcon'

export default {
  beforeCreate: init,
  components: { Main, Content, GalleryIcon },
  methods: { next, prev, close },
  mounted: start,
  data: function () {
    return {
      ready: this.ready || false,
      lock: false,
      show: false,
      video: false
    }
  }
}


// beforeCreate
async function init () {
  const list = this.$store.state.content.video
  
  for ( let key of Object.keys(list) ) 
    for ( let id = 0; id != list[key].length; ++id ) {
      const fKey = key
      const video = list[key][id]
      const poster = await getPoster(video)

      this.$store.commit('set-poster', { key, id, poster })
    }

  this.ready = true
}


// methods
async function next () {
  if ( this.lock ) return
  else this.lock = true

  await this.$refs.main.hide()
  console.log(this.$refs)
  await this.$refs.content.show()

  this.lock = false
}

async function prev () {
  if ( this.lock ) return
  else this.lock = true

  await this.$refs.main.show()

  this.lock = false
}

function close () {
  this.$refs.player.pause()
  this.show = false

  setTimeout(() => {
    this.item.close()

    this.video = false
    this.item = false
  }, 500)
}


// mounted
function start () {
  this.$root.play = async item => {
    return new Promise(resolve => {
      const lang = this.$store.state.lang.inuse
      const list = this.$store.state.content.video

      this.video = list[lang][item.id]
      this.item = item

      this.$nextTick(() => {
        this.$refs.player.addEventListener('play', _ => {
          this.show = true
          return resolve()
        })
      })
    })
  }
}


// helper functions
function getPoster (source) {
  const fragment = document.createDocumentFragment()
  const canvas = document.createElement('canvas') 
  const context = canvas.getContext('2d')
  const video = document.createElement('video')

  fragment.appendChild(canvas)
  fragment.appendChild(video)

  canvas.height = 1080
  canvas.width = 1920
  
  return new Promise(resolve => {
    video.src = source
    video.addEventListener('loadeddata', _ => {
      video.currentTime = .5
    })

    video.addEventListener('seeked', _ => {
      if ( video.currentTime < .5 ) return

      context.drawImage(video, 0, 0, 1920, 1080)
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob)

        fragment.removeChild(canvas)
        fragment.removeChild(video)

        return resolve(url)
      })
    })
  })
}
</script>

<style lang='stylus'>
@import '~main/style/base'
@import '~main/style/palette'

#body

  .player-div
    background $black
    opacity 0
    transition .5s all
    z-index 3
    &.show
      opacity 1

    .player
      max-height 100%
      max-width 100%

    .gallery-button
      background $white
      border-radius 10px
      box-shadow 0px 4px 4px RGBA(0, 0, 0, .25)
      cursor pointer
      justify-content center
      padding 12px 0 12px 16px
      position absolute
      top 20px
      right 20px

    .gallery-text
      font-family 'Oswald'
      font-size 36px
      line-height 53px
      letter-spacing .02em
      margin 0 20px 0 26px
      text-transform uppercase
</style>