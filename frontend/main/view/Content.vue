<template lang='pug'>

  div#content( :class='{...classes, blur}' )
    ContentHeader

    div( class='close-div adaptive' )
      CloseIcon( class='close-icon' @click.native='close' )

    div( class='content' )
      div( class='title-div' )
        span( class='content-title' ) {{ title }}

    div( class='adaptive' )
      VideoList

</template>

<script>
import ContentHeader from ':main/component/Content/Header'
import VideoList from ':main/component/Content/List'

import CloseIcon from ':main/component/Content/CloseIcon'

export default {
  components: { ContentHeader, VideoList, CloseIcon },
  computed: { blur, title },
  methods: { close, show, hide },
  data: function () {
    return {
      classes: {
        full: true,
        hide: true,
        disable: true
      }
    }
  }
}

// computed
function blur () {
  return this.$store.state.lang.blur
}

function title () {
  const lang = this.$store.state.lang.inuse
  const title = this.$store.state.dictionary.title

  return title[lang]
}


// methods
function close () {
  this.classes.hide = true

  setTimeout(() => {
    this.classes.disable = true
    this.$emit('prev')
  }, 300)
}

function show () {
  return new Promise(resolve => {
    this.classes.disable = false
    this.classes.hide = false

    return setTimeout(resolve, 300)
  })
}

function hide () {

}
</script>

<style lang='stylus'>
@import '~main/style/palette'

#content
  transition .3s all
  &.hide
    opacity 0
  &.disable
    display none
  &.blur .content
    *
      color transparent !important

    .content-title
      background RGBA(255, 255, 255, 1)
      max-width 350px


  .close-div
    padding 38px 0
    text-align right

    .close-icon
      cursor pointer

  .title-div
    position relative
    margin-left 76px
    &:before
      background url('~assets/img/title-clip.png')
      content ' '
      display block
      height 19px
      position absolute
      top 13px
      right 0
      left 25px

    .content-title
      background $white
      border-radius 0 40px 40px 0
      display inline-block
      font-family 'Nocturne Serif'
      font-size 36px
      line-height 43px
      letter-spacing .02em
      height 45px
      max-width 720px
      overflow hidden
      padding-right 20px
      position relative
      white-space nowrap
      z-index 1

</style>