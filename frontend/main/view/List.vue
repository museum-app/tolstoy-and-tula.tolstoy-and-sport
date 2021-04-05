<template lang='pug'>
  
  div#list( class='full' :class='{ show: classes.showContent }' )
    ListHeader( v-bind='{ show: classes.showHeader }' )
    div( v-if='content' class='content' )
      ListTitle( @close='close' v-bind='{ show: classes.showContent }' )
      ListContent( v-bind='{ content, show: classes.showItems }' )

</template>

<script>
import ListHeader from ':main/component/List/Header/Index'
import ListTitle from ':main/component/List/Title'
import ListContent from ':main/component/List/Content/Index'

export default {
  components: { ListHeader, ListTitle, ListContent },
  beforeCreate: init,
  methods: { open, close },
  mounted: start,
  data: function () {
    return {
      content: this.content || false,
      classes: {
        showHeader: false,
        showContent: false,
        showItems: false
      }
    }
  }
}


// beforeCreate
function init () {
  fetch('/content.json')
    .then(response => response.json())
    .then(data => this.content = data.full)
}


// mounted
function start () {
  if ( this.content === false )
    var watcher = this.$watch('content', () => {
      this.open()
      watcher()
    })

  else open()
}


// methods
function open () {
  this.classes.showHeader = true
  setTimeout(() => {
    this.classes.showContent = true
    this.classes.showItems = true
  }, 100)
}

function close () {
  this.classes.showItems = false

  setTimeout(() => {
    this.classes.showContent = false

    setTimeout(() => {
      this.classes.showHeader = false

      setTimeout(() => {
        this.$router.back()
      }, 200)
    }, 200)
  }, 750)
}
</script>

<style lang='stylus'>
@import '~main/style/palette'

#list
  background transparent
  transition .5s all
  
  .content
    background transparent
    margin 156px auto 0 auto
    position relative
    transition .5s all
    top -150px
    opacity 0
    width 1800px

#list.show
  background $white

  .content
    opacity 1
    top 0

</style>