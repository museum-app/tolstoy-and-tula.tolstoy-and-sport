<template lang='pug'>
    
  body#body
    div( class='bg-image full' )
    div( class='bg-color full' )

    router-view

</template>

<style lang='stylus'>
@import '~main/style/base'

#body
  overflow hidden
  overflow-y auto

  .bg-image
    background-image url('~assets/img/background.jpg')
    background-size cover

  .bg-color
    background-color $major
    opacity .74

</style>