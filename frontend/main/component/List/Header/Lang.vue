<template lang='pug'>
  
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

#list .lang
  align-items center
  background $minor
  border-radius 50%
  box-shadow: 0px 4px 4px RGBA(0, 0, 0, .25)
  cursor pointer
  display inline-flex
  justify-content center
  height 66px
  width 66px

  .lang-name-div
    background $minor
    border-radius 50%
    box-shadow 0px 4px 4px RGBA(0, 0, 0, .25)
    color $major-alt-1
    font-family Oswald
    font-style normal
    font-size 24px
    font-weight 300
    line-height 36px
    letter-spacing 0.02em
    height 60px
    width 60px

  .lang-name
    position relative
    transition none
    top -2px

#list .lang.active .lang-name-div
  background $major-alt-1
  color $minor

</style>