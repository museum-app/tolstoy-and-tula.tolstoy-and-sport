<template lang='pug'>
  
  div( class='video-div full' :class='{ show: ready && content }' )
    video( class='video' :src='video' ref='video' loop )

</template>

<script>
export default {
  props: ['content', 'ready'],
  methods: { play, pause },
  beforeMount: prestart,
  data: function () {
    return {
      video: this.content
    }
  }
}

// beforeMount
function prestart () {
  this.$watch('content', fresh => {
    if ( fresh === false )
      this.$refs.video.pause()
      
    else this.video = fresh
  })
}


// methods
function play () {
  this.$refs.video.play()
}

function pause () {
  this.$refs.video.pause()
}
</script>

<style lang='stylus'>

#player .video-div
  opacity 0
  transition .3s opacity
  z-index 4
  &.show
    opacity 1

  .video
    transition none
    height 100%
    width 100%

</style>