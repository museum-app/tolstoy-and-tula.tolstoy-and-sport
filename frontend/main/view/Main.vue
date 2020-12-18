<template lang='pug'>
    
  div#main( :class='classes' @click='next' )
    div( class='bg-color full' )
    div( class='content full' )
      MainHeader
      MainFooter      

</template>

<script>
import MainHeader from ':main/component/Main/Header'
import MainFooter from ':main/component/Main/Footer'

export default {
  components: { MainHeader, MainFooter },
  methods: { next, show, hide },
  data: function () {
    return {
      classes: {
        full: true,
        hide: false,
        disable: false
      }
    }
  }
}

// methods
function next (event) {
  setTimeout(() => {
    this.$emit('next')
  }, 250)
}

function show () {
  return new Promise(resolve => {
    this.classes.disable = false
    this.classes.hide = false

    return setTimeout(resolve, 300)
  })
}

function hide () {
  return new Promise(resolve => {
    this.classes.hide = true

    setTimeout(() => {
      this.classes.disable = true
      return resolve()
    }, 200)
  })
}
</script>

<style lang='stylus'>
#main
  background url('~assets/img/background.jpg')
  background-size cover
  transition .3s all
  &.hide
    opacity 0
  &.disable
    display none

  .bg-color
    background #172235
    opacity .74

  .content
    z-index 1
</style>