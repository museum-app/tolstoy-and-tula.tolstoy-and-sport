<template lang='pug'>
    
  div#start( class='full' @click='goNext' )
    div( class='content full' )
      StartTitle( ref='title' )
      StartLangbox( ref='langbox' )
      

</template>

<script>
import StartTitle from ':main/component/Start/Title'
import StartLangbox from ':main/component/Start/Langbox'

export default {
  components: { StartTitle, StartLangbox },
  methods: { goNext },
  mounted: start
}


// mounted
function start () {
  setTimeout(() => {
    this.$refs.title.show()
    this.$refs.langbox.show()
  }, 250)
}


// methods
function goNext () {
  this.$refs.title.hide()
  this.$refs.langbox.hide()

  setTimeout(() => {
    this.$router.push('/list')
  }, 750)
}
</script>

<style lang='stylus'>
@import '~main/style/palette'

#start
  overflow hidden

</style>