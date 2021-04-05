<template lang='pug'>
  
  div( class='title-div flex-center' :class='animate' )
    h2( class='title' ) Лев Толстой и спортивные увлечения
    span( class='title-delemiter' )
    h2( class='title' ) Leo Tolstoy and sport hobbies

</template>

<script>
export default {
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
  this.animate.wide = true

  setTimeout(() => {
    this.animate.tall = true
  }, 300)
}

function hide () {
  this.animate.tall = false

  setTimeout(() => {
    this.animate.wide = false
  }, 200)
}
</script>

<style lang='stylus'>
@import '~main/style/palette'

#start .title-div
  flex-direction column
  margin 64px auto
  overflow hidden
  text-align center
  max-width 0
  height 210px

  .title
    color $minor
    font-family 'Nocturne Serif'
    font-weight 400
    font-size 64px
    line-height 77px
    letter-spacing .02em
    overflow hidden
    max-height 0

  .title-delemiter
    border 1px dashed $minor
    display block
    margin 20px auto
    width 1215px

#start .title-div.wide
  max-width 1250px

#start .title-div.tall

  .title
    max-height 80px
</style>