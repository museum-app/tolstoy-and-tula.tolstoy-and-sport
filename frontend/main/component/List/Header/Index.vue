<template lang='pug'>
  
  div( class='list-header' :class='{ show }' )
    div( class='lines' )
    div( class='full flex-center' )
      div( class='title-div' )
        TitleSVG

    div( class='langbox-div full flex-center' )
      ListLangBox

</template>

<script>
import ListLangBox from './LangBox'
import TitleSVG from ':main/svg/TitleSVG'

export default {
  props: ['show'],
  components: { ListLangBox, TitleSVG }
}
</script>

<style lang='stylus'>
@import '~main/style/palette'

.list-header
  background $major-alt-2
  box-shadow 0px 4px 4px RGBA(0, 0, 0, .25)
  position fixed
  transition .3s all
  top -130px
  left 0
  right 0
  height 125px
  z-index 2
  &.show
    top 0
  
  .lines
    border 1px solid $minor
    border-left none
    border-right none
    height 4px
    position absolute
    top calc(50% - 2px)
    left 0
    right 0

  .title-div
    background $major-alt-2

  .langbox-div
    justify-content flex-end

</style>