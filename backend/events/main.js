'use as event'

const pathAlias = require('path-alias')

const window = pathAlias('@app/core/window')
const ipc = pathAlias('@app/extra/ipcMain')

module.exports = { install }

function install () {
  ipc.async('show-main', startApp)
}

function startApp () {
  window.main.target().show()

  if ( window.autoUpdate.target() )
    window.autoUpdate.target().destroy()
}