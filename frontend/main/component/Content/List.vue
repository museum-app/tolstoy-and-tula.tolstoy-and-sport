<template lang='pug'>
  
  div( class='content-list' )
    div( class='content-row' v-for='(clip, row) of content' )
      template( v-for='(video, id) of clip' )
        Item( v-bind='{ id: row * 5 + id }' )

</template>

<script>
import Item from ':main/component/Content/List/Item'

export default {
  components: { Item },
  computed: { content }
}

// computed
function content () {
  const result = []
  const lang = this.$store.state.lang.inuse
  const list = this.$store.state.content.video
  const copy = [...list[lang]]

  while ( copy.length > 0 ) {
    let clip = copy.splice(0, 5)
    result.push(clip)
  }

  return result
}
</script>

<style lang='stylus'>
@import '~main/style/palette'

#content .content-list
  margin 36px 0
  
  .content-row
    margin 20px 0
    max-height 189px

  .poster-div
    background $black
    border-radius 3px
    cursor pointer
    display inline-block
    margin 0 10px
    height 189px
    width 336px
    &:first-child
      margin-left 0
    &:last-child
      margin-right 0

  .poster
    border-radius 3px
    max-height 100%
    max-width 100%
</style>