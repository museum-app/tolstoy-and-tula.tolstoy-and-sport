<template lang='pug'>
  
  div( class='langbox flex-center' )
    div( class='lang-button flex-center' :class='{ active: current === `en` }' )
      span( class='lang-text flex-center' @click='set(`en`)' ) Eng

    div( class='lang-button flex-center' :class='{ active: current === `ru` }' )
      span( class='lang-text flex-center' @click='set(`ru`)' ) Ru

</template>

<script>
export default {
  computed: { current },
  methods: { set }
}

//computed
function current () {
  return this.$store.state.lang.current
}


// methods
function set (lang) {
  this.$store.commit('set-lang', lang)
}
</script>

<style lang='stylus'>
@import '~main/style/palette'

#content .langbox
  justify-content space-between
  width 150px

  .lang-button
    background $minor
    box-shadow 0px 4px 4px RGBA(0, 0, 0, .25)
    border-radius 50%
    cursor pointer
    height 65px
    width 65px

    .lang-text
      background $major
      box-shadow: 0px 4px 4px RGBA(0, 0, 0, .25)
      border-radius 50%
      color $minor
      font-family Oswald
      font-weight 300
      font-size 24px
      line-height 36px
      letter-spacing 0.02em
      height 59px
      width 59px

  .lang-button.active
    cursor default
    
    .lang-text
      background $minor
      color $major
</style>