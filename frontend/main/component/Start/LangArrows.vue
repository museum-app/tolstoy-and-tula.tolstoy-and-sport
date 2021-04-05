<template lang='pug'>
  
  div( class='arrows-div' :class='{ reverse }' )
    template( v-for='i in 3' )
      div( class='arrow' )
        ArrowSVG

</template>

<script>
import ArrowSVG from ':main/svg/ArrowSVG'

export default {
  props: ['reverse'],
  components: { ArrowSVG }
}
</script>

<style lang='stylus'>

#start .arrows-div
  display block
  &.reverse
    transform scale(-1, 1)

  .arrow
    display inline-block
    margin-right -22px


#start .langbox-div.wide .arrows-div .arrow
  margin-right -10px

</style>