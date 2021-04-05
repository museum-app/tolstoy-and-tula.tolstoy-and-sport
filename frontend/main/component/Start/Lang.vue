<template lang='pug'>
  
  div( class='lang-animator' )
    div( :class='[`lang`, { active }]' @click='change' )
      div( class='lang-name-div flex-center' )
        span( class='lang-name' ) {{ name }}


</template>

<script>
export default {
  props: ['code', 'name'],
  computed: { active },
  methods: { change }
}


// computed
function active () {
  return this.$store.state.lang === this.code
}


// methods
function change () {
  this.$store.commit('set-lang', this.code)
}
</script>

<style lang="stylus">
@import '~main/style/palette'

#start .lang-animator
  overflow hidden
  padding 0
  margin 0 16px
  max-width 0
  height 120px
  &:last-child .lang
    margin-left -115px

  .lang
    align-items center
    background $minor
    border-radius 50%
    box-shadow: 0px 4px 4px RGBA(0, 0, 0, .25)
    cursor pointer
    display inline-flex
    justify-content center
    height 110px
    width 110px

  .lang-name-div
    background $minor
    border-radius 50%
    box-shadow 0px 4px 4px RGBA(0, 0, 0, .25)
    color $major-alt-1
    font-family 'Oswald'
    font-size 36px
    font-weight 300
    letter-spacing .02em
    line-height 53px
    height 100px
    width 100px

  .lang-name
    position relative
    top -3px

#start .lang.active .lang-name-div
  background $major-alt-1
  color $minor

#start .langbox-div.wide .lang-animator
  padding 5px
  max-width 120px
  &:last-child .lang
    margin-left 0

</style>