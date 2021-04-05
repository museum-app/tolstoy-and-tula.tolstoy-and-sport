<template lang='pug'>
  
  div#content( :class='{ showText }' )
    template( v-for='(item, index) of content[lang]' )
      div( class='item' ref='item' @click='open(index)'
        :class='{ active: index === currentIndex, show: activeItem >= index }' )
        img( class='poster' :src='`/poster/${lang}/${item}-poster.jpg`' )

    template( v-if='player' )
      ContentPlayer( v-bind='{ current, lastUpdate }' @close='close' @slide='slide' )

</template>

<script>
import ContentPlayer from './Player/Index'

export default {
  props: ['content', 'show'],
  components: { ContentPlayer },
  computed: { lang, showText },
  methods: { open, close, slide, activateItems },
  mounted: start,
  data: function ()  {
    return {
      lastUpdate: Date.now(),
      player: false,
      current: false,
      currentIndex: false,
      activeItem: -1
    }
  }
}


// mounted
function start () {
  this.$watch('currentIndex', fetch => {
    this.current = {
      item: this.$refs.item[fetch],
      name: this.content[this.lang][fetch]
    }

    this.lastUpdate = Date.now()
  })

  this.$watch('show', value => {
    const items = numbers(this.$refs.item.length)
    const animationTime = value ? 1500 : 750

    if ( value === false )
      items.reverse()

    return this.activateItems(items, animationTime)
  })
}


// computed
function lang () {
  return this.$store.state.lang
}

function showText () {
  return this.$store.state.showText
}

// methods
function open (index) {
  if ( index === this.currentIndex )
    return

  this.currentIndex = index
  this.$nextTick(() => {
    this.player = true
  })
}

function close () {
  this.currentIndex = false
  this.current = false
  this.player = false
}

function slide (n) {
  const calc = this.currentIndex + n

  if ( calc ===  this.$refs.item.length )
    this.currentIndex = 0
    
  else if ( calc < 0 )
    this.currentIndex = this.$refs.item.length - 1

  else this.currentIndex = calc
}


function activateItems (items, time = 1500) {
  const count = items.length
  const array = numbers(count)

  for ( let index of array ) {
    setTimeout(() => {
      this.activeItem = items[index]
    }, Math.max(index, 0) * (time / count))
  }
}

// helper functions
function numbers (n) {
  const result = [-1]

  for ( let i = 0; i != n; ++i )
    result.push(i)

  return result
}

</script>

<style lang='stylus'>
@import '~main/style/palette'

#content

  .item
    border-radius 3px
    cursor pointer
    display inline-block
    margin 0 18px 36px 0
    overflow hidden
    opacity 0
    position relative
    transition .5s all
    top -30px
    height 191.25px
    width 340px
    &:before
      background-color #DDD
      content ''
      display block
      position absolute
      transition .25s all
      top 0
      left 0
      right 0
      bottom 0
    &:after
      background RGBA(0, 0, 0, .8)
      content ''
      display block
      opacity 0
      position absolute
      top 0
      left 0
      height 100%
      width 100%
    &.active:after
      opacity 1
      transition .4s all
    &.show
      opacity 1
      top 0


    .poster
      height 100%
      width 100%

#content.showText .item:before
  top 100%

</style>