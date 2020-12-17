<template lang='pug'>
  
  div( class='content-header' )
    div( class='header-line' )

    div( class='header-title-div' )
      HeaderTitle
    
    div( class='langbox-div' )
      LangBox

</template>

<script>
import HeaderTitle from './Header/Title'
import LangBox from './Header/LangBox'

export default {
  components: { HeaderTitle, LangBox }
}
</script>

<style lang='stylus'>
@import '~main/style/palette'

#content .content-header
  background $major-light
  box-shadow 0px 4px 4px RGBA(0, 0, 0, .25)
  height 124px
  position relative

  .header-line
    border 1px solid $minor
    border-left none
    border-right none
    padding 1px 0
    position absolute
    top 60px
    left 0
    width 100%

  .header-title-div
    background $major-light
    height 50px
    width 315px
    position absolute
    top calc(50% - 27.5px)
    left calc(50% - 157.5px)

  .langbox-div
    width 150px
    position absolute
    transform translate(0, -50%)
    top 50%
    right 76px

</style>