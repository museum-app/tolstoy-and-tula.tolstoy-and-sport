<template lang='pug'>
  
  div( class='langbox' )
    Lang( v-bind='{ code: `eng`, name: `Eng` }' )
    Lang( v-bind='{ code: `rus`, name: `Ru` }' )

</template>

<script>
import Lang from './Lang'

export default {
  components: { Lang }
}
</script>

<style lang='stylus'>
@import '~main/style/palette'

#list .langbox
  align-items center
  display flex
  justify-content space-between
  margin-right 50px
  overflow hidden
  width 145px

</style>