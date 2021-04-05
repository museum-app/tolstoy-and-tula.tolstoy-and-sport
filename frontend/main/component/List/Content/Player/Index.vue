<template lang='pug'>
  
  div#player( :style='styles' )
    PlayerPoster( v-bind='{ content: poster }' @ready='open' @change='changeVideo' @unlock='unlock' )
    PlayerVideo( v-bind='{ ready, content: video }' ref='video' )
    PlayerControls( v-bind='{ ready }' @close='close' @slide='slide' )

</template>

<script>
import PlayerPoster from './Poster'
import PlayerVideo from './Video'
import PlayerControls from './Controls'

const defaultStyles = {
  top: '',
  left: '',
  height: '191.25px',
  width: '340px'
}

export default {
  props: ['current', 'lastUpdate'],
  components: { PlayerPoster, PlayerVideo, PlayerControls },
  created: prestart,
  methods: { open, close, slide,
    update, unlock, changeVideo, URNof },
  data: function () {
    Object.freeze(defaultStyles)

    return {
      ready: false,
      lock: false,
      video: false,
      poster: this.poster || false,
      styles: { ...defaultStyles }
    }
  }
}

function prestart () {
  this.poster = this.URNof('poster', this.current.name)
  this.$watch('lastUpdate', this.update)

  this.styles.top = relativeDimOf(this.current.item, 'y') + 'px'
  this.styles.left = relativeDimOf(this.current.item, 'x') + 'px'
}

// methods
function open () {
  setTimeout(() => {
    this.styles.top = 'calc(50% - 225px)'
    this.styles.left = 'calc(50% - 400px)'
    this.styles.height = '450px'
    this.styles.width = '800px'

    setTimeout(() => {
      this.styles.top = 0
      this.styles.left = 0
      this.styles.height = '1080px'
      this.styles.width = '1920px'
      this.styles.zIndex = 2

      setTimeout(() => {
        this.ready = true
      }, 400)
    }, 200)
  }, 100)
}

function close () {
  this.ready = false
  this.video = false
  
  setTimeout(() => {
    this.styles.top = 'calc(50% - 225px)'
    this.styles.left = 'calc(50% - 400px)'
    this.styles.height = '450px'
    this.styles.width = '800px'
    this.styles.zIndex = ''

    setTimeout(() => {
      this.styles.top = relativeDimOf(this.current.item, 'y') + 'px'
      this.styles.left = relativeDimOf(this.current.item, 'x') + 'px'
      this.styles.height = defaultStyles.height
      this.styles.width = defaultStyles.width

      this.$nextTick(() => {
        setTimeout(() => {
          this.$emit('close')
        }, 300)
      })
    }, 150)
  }, 200)
}

function slide (n) {
  if ( this.lock ) return
  else this.lock = true
  
  this.$emit('slide', n)
}

function update () {
  this.video = false

  setTimeout(() => {
    this.poster = this.URNof('poster', this.current.name)
  }, 200)
}

function unlock () {
  this.$nextTick(() => {
    this.lock = false
    this.$refs.video.play()
  })
}

function changeVideo () {
  this.video = this.URNof('video', this.current.name)
}

function URNof (source, name) {
  const lang = this.$parent.lang
  const path = `/${source}/${lang}/${name}-${source}`

  return path + (source === 'poster' ? '.jpg' : '.mp4')
}


// helper functions
function relativeDimOf (el, type) {
  const dim = type === 'x'
    ? { margin: 'offsetLeft', scroll: 'scrollX' }
    : { margin: 'offsetTop', scroll: 'scrollY' }

  var current = el
  var result = el[dim.margin] || 0

  while ( current = current.offsetParent )
    result += current[dim.margin] || 0

  return result - window[dim.scroll]
}

</script>

<style lang='stylus'>

#player
  position fixed
  transition .4s all
  z-index 1

</style>