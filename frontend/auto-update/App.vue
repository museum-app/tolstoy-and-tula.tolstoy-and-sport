<template lang='pug'>
    
  body#body
    img( class='image' src='~assets/img/tolstoy.png' )
    div( class='content' )
      img( class='title' src='~assets/img/title.png' )
      span( class='version' ) Версия {{ version }}
      div( class='center' )
        div( class='status-div' )
          p( class='status-text' ) {{ statusText }}
          img( class='preloader' src='~assets/img/preloader.gif' )


</template>

<script>
const { ipc } = window

export default {
  beforeCreate: init,
  computed: { statusText },
  methods: { isOnline, updateStatus },
  mounted: start,
  data: function () {
    return {
      version: this.version || '0.0.0',
      status: 0,
      statusCodes: {
        0: 'Проверка на обновления',
        1: 'Загрузка обновления',
        2: 'Установка обвноления',
        3: 'Запуск'
      }
    }
  } 
}

// beforeCreate
async function init () {
  const version = await ipc.async('get-version')

  this.version = version
}


// computed
function statusText () {
  return this.statusCodes[this.status]
}


//methods
async function updateStatus () {
  const status = await ipc.async('update-status')

  this.status = status
  setTimeout(this.updateStatus, 250)
}

function isOnline () {
  return new Promise(resolve => {
    var tryN = 0
    var interval = setInterval(() => {
      ++tryN

      if ( navigator.onLine === 'online' ) {
        clearInterval(interval)
        return resolve(true)
      }

      if ( tryN === 3 ) {
        clearInterval(interval)
        return resolve(false)
      }

    }, 5000)
  })
}

// mounted
async function start () {
  const online = this.isOnline()

  if ( online )
    ipc.async('start-update')
  else ipc.async('skip-update')

  this.updateStatus()
}

</script>

<style lang='stylus'>
@import '~au/style/base'

#body
  position absolute
  top 0
  left 0
  right 0
  bottom 0

  .image
    position relative
    height 97.5%
    z-index 5

  .content
    background #FFF
    border-radius 10px 10px 10px 70%
    position absolute
    left 150px
    top 100px
    right 0
    bottom 20px
    z-index 1

  .title
    position absolute
    top 20px
    right 20px
    width 300px

  .version
    color #777
    font-family monospace
    font-size 16px
    position absolute
    bottom 15px
    right 20px

  .center
    align-items flex-end
    display flex
    flex-direction column
    justify-content center
    position absolute
    left 120px
    top 50px
    right 20px
    bottom 25px

  .status-div
    text-align center
    position relative
    top -10px

  .status-text
    color #2D404C
    font-family sans-serif
    font-size 20px
    margin 8px 0

  .preloader
    height 15px
    position relative
    left -5px
</style>