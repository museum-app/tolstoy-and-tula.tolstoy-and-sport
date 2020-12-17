<template lang='pug'>

  div( class='poster-div flex-center' @click='open' )
    img( class='poster' :src='poster[id]' :style='styles' ref='image' )

</template>

<script>
export default {
  props: ['id'],
  computed: { poster },
  methods: { open, close },
  data: function () {
    return {
      openned: false,
      last: {},
      styles: {
        borderRadius: '',
        maxHeight: '',
        maxWidth: '',
        transition: '',
        position: '',
        top: '',
        left: '',
        zIndex: ''
      }
    }
  }
}

// computed
function poster () {
  const lang = this.$store.state.lang.inuse
  const list = this.$store.state.content.poster

  return list[lang]
}


// methods
function open () {
  if ( this.openned ) return

  const { offsetTop, offsetLeft } = this.$refs.image
  const { scrollTop } = document.scrollingElement

  this.styles.position = 'fixed'
  this.styles.top = `${offsetTop - scrollTop }px`
  this.styles.left = `${offsetLeft}px`
  this.styles.zIndex = 4

  this.last = { ...this.styles }

  setTimeout(() => {
    this.styles.maxHeight = '1080px'
    this.styles.maxWidth = '1920px'
    this.styles.top = '0'
    this.styles.left = '0'

    setTimeout(async () => {
      await this.$root.play(this)
      return this.openned = true
    }, 300)
  }, 150)
}


function close () {
  this.styles = this.last

  setTimeout(() => {
    this.styles.transition = 'none'
    this.styles.position = ''
    this.styles.top = ''
    this.styles.left = ''
    this.styles.zIndex = ''

    setTimeout(() => {
      this.styles.transition = ''
      this.openned = false
    }, 50)
  }, 300)
}
</script>

<style lang='stylus'>
@import '~main/style/palette'

#content .content-list .poster-div
  background $black
  border-radius 2px
  cursor pointer
  height 189px
  width 336px

  .poster
    border-radius 2px
    max-height 189px
    max-width 336px
    position relative
    z-index 3
</style>