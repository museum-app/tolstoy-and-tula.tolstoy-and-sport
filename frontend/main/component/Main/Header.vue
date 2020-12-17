<template lang='pug'>

  div( class='main-header' )
    span( class='title' ) Лев Толстой и спортивные увлечения
    span( class='dashes' )
    span( class='title' ) Leo Tolstoy and sports hobbies

</template>

<style lang='stylus'>
@import '~main/style/palette'

#main .main-header
  margin 64px auto
  text-align center
  width 1210px

  .title
    color $minor
    display block
    font-family 'Nocturne Serif'
    font-size 64px
    line-height 77px
    letter-spacing .02em

  .dashes
    border-top 1px dashed $minor
    display block
    margin 20px 0 10px 0
  
</style>