<template lang='pug'>
  
  div( class='player-controls full' :class='{ ready }' )
    div( class='gallery-button flex-center' @click='close' )
      GallerySVG
      span( class='button-text' ) Галлерея

    div( class='arrows-div full flex-center' ref='slider' )
      PrevSVG( @click.native='go(-1)' )
      NextSVG( @click.native='go(1)' )

    

</template>

<script>
import GallerySVG from ':main/svg/GallerySVG'
import PrevSVG from ':main/svg/PrevSVG'
import NextSVG from ':main/svg/NextSVG'

export default {
  props: ['ready'],
  components: { GallerySVG, PrevSVG, NextSVG },
  methods: { close, go,
    saveStart, saveMove, saveEnd, resultTouch },
  mounted: start,
  data: function () {
    return {
      touches: {
        start: {},
        end: {}
      }
    }
  }
}


// mounted
function start () {
  this.$refs.slider.addEventListener('touchstart', this.saveStart)
  this.$refs.slider.addEventListener('touchmove', this.saveMove)
  this.$refs.slider.addEventListener('touchend', this.saveEnd)

  this.$refs.slider.addEventListener('mousedown', this.saveStart)
  this.$refs.slider.addEventListener('mousemove', this.saveMove)
  this.$refs.slider.addEventListener('mouseup', this.saveEnd)
}


// methods
function close () {
  this.$emit('close')
}

function go (n) {
  this.$emit('slide', n)
}

function saveStart (event) {
  const toSave = event.type === 'touchstart'
    ? event.touches[0] : event

  this.touches.end = false
  this.touches.start = {
    event: toSave,
    time: Date.now()
  }
}

function saveMove (event) {
  const toSave = event.type === 'touchmvoe'
    ? event.touches[0] : event

  this.touches.end = {
    event: toSave,
    time: Date.now()
  }
}

function saveEnd () {
  const { start, end } = this.touches
  const dimX = {
    start: start.event.clientX,
    end: end.event && end.event.clientX || start.event.clientX
  }

  if ( end.time - start.time < 1000 )
    this.resultTouch(dimX)
}

function resultTouch ({ start, end }) {
  const range = Math.abs(start - end)

  if ( range < 300 ) return

  return start > end
    ? this.go(+1)
    : this.go(-1)
}
</script>

<style lang='stylus'>
@import '~main/style/palette'

#player .player-controls
  opacity 0
  z-index 5
  &.ready
    opacity 1

  .gallery-button
    background $white
    border-radius 10px
    box-shadow 0 4px 4px RGBA(0, 0, 0, .25)
    padding 12px 14px
    position absolute
    top 30px
    right 30px
    z-index 6

    .button-text
      color $major-alt-2
      cursor pointer
      font-family 'Oswald'
      font-size 36px
      line-height 53px
      letter-spacing .02em
      margin 0 12px 0 24px
      text-transform uppercase

  .arrows-div
    cursor pointer
    justify-content space-between
    padding 0 32px
</style>