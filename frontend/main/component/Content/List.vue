<template lang='pug'>
  
  div( class='content-list' )
    template( v-for='(video, id) of content' )
      Item( v-bind='{ id }' )

</template>

<script>
import Item from ':main/component/Content/List/Item'

export default {
  components: { Item },
  computed: { content }
}

// computed
function content () {
  const lang = this.$store.state.lang.inuse
  const list = this.$store.state.content.video

  return list[lang]
}
</script>

<style lang='stylus'>
@import '~main/style/palette'

#content .content-list
  margin 36px 0
  
  .poster-div
    background $black
    border-radius 2px
    cursor pointer
    height 189px
    width 336px

  .poster
    border-radius 2px
    max-height 100%
    max-width 100%
</style>