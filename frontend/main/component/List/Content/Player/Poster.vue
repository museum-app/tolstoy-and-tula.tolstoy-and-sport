<template lang='pug'>
  
  div( class='poster-div full' :class='{ change }' )
    img( class='poster fresh' :src='poster.fresh' ref='fresh' )
    img( class='poster old' :src='poster.old' ref='old' )

</template>

<script>
export default {
  props: ['content'],
  mounted: start,
  methods: { ready, update, setAsOld, hideFresh },
  data: function () {
    return {
      change: false,
      poster: {
        fresh: false,
        old: false
      }
    }
  }
}

// mounted
function start () {
  this.poster.old = this.content
  this.poster.fresh = this.content

  this.$watch('content', this.update)

  this.$refs.old.addEventListener('load', this.hideFresh)
  this.$refs.fresh.addEventListener('load', this.ready)
}

// methods
function ready () {  
  this.$refs.fresh.removeEventListener('load', this.ready)
  this.$refs.fresh.addEventListener('load', this.setAsOld)

  this.$emit('ready')
}

function update (fresh) {
  this.poster.fresh = fresh
}

function setAsOld () {
  this.change = true

  this.$nextTick(() => {
    setTimeout(() => {
      this.poster.old = this.content
    }, 350)
  })
}

function hideFresh () {
  this.$emit('change')
  this.change = false

  this.$nextTick(() => {
    this.$emit('unlock')
  })
}
</script>

<style lang='stylus'>
#player .poster-div
  transition none

  .poster
    position absolute
    transition none
    height 100%
    width 100%
    &.old
      z-index 2
    &.fresh
      opacity 0
      z-index 3

#player .poster-div.change .poster.fresh
  opacity 1
  transition .3s all
</style>