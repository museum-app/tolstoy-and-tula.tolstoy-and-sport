<template lang='pug'>
  
  div( class='langs-div flex-center' )
    div( class='lang-button flex-center' :class='{ active: current === `en` }' )
      span( class='lang-text flex-center' @click='set(`en`)' ) Eng

    span( class='delimiter' )

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
  return this.$store.state.lang
}


// methods
function set (lang) {
  this.$store.commit('set-lang', lang)
}
</script>

<style lang='stylus'>
@import '~main/style/palette'

#main .langs-div
  width 260px

  .lang-button
    background $minor
    box-shadow 0px 4px 4px RGBA(0, 0, 0, .25)
    border-radius 50%
    cursor pointer
    height 110px
    width 110px

    .lang-text
      background $major
      box-shadow: 0px 4px 4px RGBA(0, 0, 0, .25)
      border-radius 50%
      color $minor
      font-family Oswald
      font-weight 300
      font-size 36px
      line-height 53px
      letter-spacing: 0.02em
      height 100px
      width 100px

  .lang-button.active
    cursor default
    
    .lang-text
      background $minor
      color $major

  .delimiter
    background $minor
    display block
    margin 0 16px
    height 110px
    width 3px
</style>