<template lang="pug">

  div#player-div( v-if='video' class='full flex-center' :class='{ show }' )
    video( class='player' :src='video' ref='player' autoplay loop )

    div( class='buttons-div full flex-center' )
      div( @click='change(`prev`)' )
        GoPrev

      div( @click='change(`next`)' )
        GoNext

    div( class='gallery-button flex-center' @click='close' )
      GalleryIcon
      span( class='gallery-text' ) Галерея

</template>

<script>
import GalleryIcon from ':main/component/GalleryIcon'
import GoNext from ':main/component/App/NextIcon'
import GoPrev from ':main/component/App/PrevIcon'

export default {
  components: { GalleryIcon, GoNext, GoPrev },
  methods: { play, close, change, listen,
    signEvents, removeEvents, startEvent, stopEvent },
  data: function () {
    return {
      lock: false,
      show: false,
      video: false
    }
  }
}

// methods
async function play (item) {
  return new Promise(resolve => {
    const lang = this.$store.state.lang.inuse
    const list = this.$store.state.content.video

    this.video = list[lang][item.id]
    this.item = item

    this.signEvents()
    return this.listen(resolve)
  })
}

function close () {
  this.$refs.player.pause()
  this.show = false

  setTimeout(() => {
    this.removeEvents()
    this.item.close()

    this.video = false
    this.item = false

  }, 500)
}

async function change (side) {
  if ( this.lock === true ) return
  else this.lock = true

  const item = await this.item.change(side)
  this.item = item
  this.lock = false
}

function listen (resolve) {
  const self = this
  if ( this.$refs.player )
    this.$refs.player.addEventListener('play', onceReply)

  else this.$nextTick(() => {
    this.$refs.player.addEventListener('play', onceReply)
  })

  function onceReply () {
    self.show = true
    return resolve()
  }
}

function signEvents () {
  this.$nextTick(() => {
    this.$el.addEventListener('mousedown', this.startEvent)
    this.$el.addEventListener('touchstart', this.startEvent)

    this.$el.addEventListener('mouseup', this.stopEvent)
    this.$el.addEventListener('touchend', this.stopEvent)
  })
}

function removeEvents () {
  this.$nextTick(() => {
    this.$el.removeEventListener('mousedown', this.startEvent)
    this.$el.removeEventListener('touchstart', this.startEvent)

    this.$el.removeEventListener('mouseup', this.stopEvent)
    this.$el.removeEventListener('touchend', this.stopEvent)
  })
}

function startEvent (event) {
  this.touchEvent = event
}

function stopEvent (event) {
  const start = this.touchEvent
  const stop = event

  if ( Math.abs(start.clientY - stop.clientY) > 300 ) return
  if ( Math.abs(start.clientX - stop.clientX) < 300 ) return

  if ( start.clientX > stop.clientX )
    this.change('next')

  else this.change('prev')
  
}
</script>

<style lang='stylus'>
@import '~main/style/palette'

#player-div
  background $black
  opacity 0
  position fixed
  transition .5s all
  z-index 5
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
    z-index 11

  .gallery-text
    font-family 'Oswald'
    font-size 36px
    line-height 53px
    letter-spacing .02em
    margin 0 20px 0 26px
    text-transform uppercase

  .buttons-div
    cursor pointer
    display flex
    justify-content space-between
    padding 0 24px
    z-index 10
</style>