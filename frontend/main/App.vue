<template lang='pug'>
    
  body#body
    Main( ref='main' @next='next' )

</template>

<script>
import Main from ':main/view/Main'

export default {
  components: { Main },
  methods: { next },
  data: function () {
    return {
      lock: false
    }
  }
}

// methods
async function next () {
  if ( this.lock ) return
  else this.lock = true

  await this.$refs.main.hide()
  // TODO: show next view

  this.lock = false
}
</script>

<style lang='stylus'>
@import '~main/style/base'

</style>