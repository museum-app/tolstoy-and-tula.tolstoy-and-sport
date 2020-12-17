<template lang='pug'>

  div( class='main-footer')
    LeftArrows
    LangBox
    RightArrows

</template>

<script>
import LangBox from './LangBox'

import LeftArrows from './arrows/Left'
import RightArrows from './arrows/Right'

export default {
  components: { LangBox, LeftArrows, RightArrows }
}
</script>

<style lang='stylus'>
@import '~main/style/palette'

#main .main-footer
  align-items center
  display flex
  justify-content space-between
  position absolute
  left calc(50% - 520px)
  bottom 210px
  width 1040px
  
</style>