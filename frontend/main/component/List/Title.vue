<template lang='pug'>
  
  div#title( :class='{ show }' )
    div( class='title-div' )
      div( class='title-bg' )
      h1( class='title-text' :class='{ showText }' ) {{ title }}

    div( class='close-div' @click='close' )
      CloseSVG

</template>

<script>
import CloseSVG from ':main/svg/CloseSVG'

export default {
  props: ['show'],
  components: { CloseSVG },
  computed: { title, showText },
  methods: { close }
}


// computed
function title () {
  const options = {
    rus: 'Лев Толстой и спортивные увлечения',
    eng: 'Leo Tolstoy and sport hobbies',
  }

  return options[this.$store.state.lang]
}

function showText () {
  return this.$store.state.showText
}


// methods
function close () {
  this.$emit('close')
}
</script>

<style lang='stylus'>
@import '~main/style/palette'

#title
  opacity 0
  padding 64px 0 34px 0
  position relative
  &.show
    opacity 1

  .title-div
    height 47px
    position relative


  .title-bg
    background url('~assets/title-clip.png')
    position absolute
    top 19px
    left 12px
    right -500px
    height 20px

  .title-text
    background $white
    color $major-alt-2
    display inline-block
    font-family 'Nocturne Serif'
    font-weight normal
    font-size 36px
    line-height 43px
    letter-spacing .02em
    max-height 0
    overflow hidden
    padding-right 20px
    position relative
    z-index 1
    &.showText
      max-height 47px

  .close-div
    cursor pointer
    position absolute
    top 0
    right 0
</style>