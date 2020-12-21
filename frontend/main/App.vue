<template lang='pug'>
    
  body#body
    Main( ref='main' @next='next' )
    Content( v-if='ready' ref='content' @prev='prev' )

    Player( ref='player' )
    


</template>

<script>
import Main from ':main/view/Main'
import Content from ':main/view/Content'
import Player from ':main/component/App/Player'

const fragment = document.createDocumentFragment()
const canvas = document.createElement('canvas') 
const context = canvas.getContext('2d')
const video = document.createElement('video')

const local = { fragment, canvas, context, video }
  
local.fragment.appendChild(local.canvas)
local.fragment.appendChild(local.video)

local.canvas.height = 1080
local.canvas.width = 1920

export default {
  beforeCreate: init,
  components: { Main, Content, Player },
  methods: { next, prev },
  mounted: start,
  data: function () {
    return {
      ready: this.ready || false,
      lock: false,
      video: false
    }
  }
}


// beforeCreate
async function init () {
  console.log('Init...')
  const list = this.$store.state.content.video
  
  for ( let key of Object.keys(list) ) 
    for ( let id = 0; id != list[key].length; ++id ) {
      const fKey = key
      const video = list[key][id]
      const poster = await getPoster(video)

      this.$store.commit('set-poster', { key, id, poster })
    }

  this.ready = true
  ipc.async('show-main')
  console.log('ready!')
}


// methods
async function next () {
  if ( this.lock || !this.ready ) return
  else this.lock = true

  await this.$refs.main.hide()
  await this.$refs.content.show()

  this.lock = false
}

async function prev () {
  if ( this.lock ) return
  else this.lock = true

  await this.$refs.main.show()

  this.lock = false
}


// mounted
function start () {
  this.$root.play = this.$refs.player.play
}


// helper functions
function getPoster (source) {
  const { context, canvas, video } = local

  return new Promise(resolve => {
    console.log('loading:', source)
    video.src = source

    video.addEventListener('loadeddata', loadeddata)
    video.addEventListener('seeked', seeked)

    function loadeddata () {
      console.log('loaded:', source)

      video.currentTime = .5
      video.removeEventListener('loadeddata', loadeddata)
    }

    function seeked () {
      if ( video.currentTime < .5 ) return

      video.removeEventListener('seeked', seeked)
      context.drawImage(video, 0, 0, 1920, 1080)
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob)
        return resolve(url)
      })
    }
  })
}
</script>

<style lang='stylus'>
@import '~main/style/base'
  
</style>