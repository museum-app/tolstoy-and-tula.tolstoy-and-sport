<template lang='pug'>
  
  div( class='langbox-div' :class='animate' )
    LangArrows

    div( class='langbox flex-center' )
      Lang( v-bind='{ code: `eng`, name: `Eng` }' )
      span( class='lang-delemiter' )
      Lang( v-bind='{ code: `rus`, name: `Ru` }' )
    
    LangArrows( :reverse='true' )

</template>

<script>
import Lang from './Lang'
import LangArrows from './LangArrows'

export default {
  components: { Lang, LangArrows },
  methods: { show, hide },
  data: function () {
    return {
      animate: {
        tall: false,
        wide: false
      }
    }
  }
}


// methods
function show () {
  this.animate.tall = true

  setTimeout(() => {
    this.animate.wide = true
  }, 250)
}

function hide () {
  this.animate.wide = false

  setTimeout(() => {
    this.animate.tall = false
  }, 250)
}
</script>

<style lang='stylus'>
@import '~main/style/palette'


#start .langbox-div
  align-items center
  display flex
  justify-content space-between
  margin 500px auto 0 auto
  overflow hidden
  max-height 0
  width 1200px

  .langbox
    width 320px

  .lang-delemiter
    background $minor
    border-radius 2px
    display inline-block
    height 110px
    width 2px

#start .langbox-div.tall
  max-height 120px
</style>