'use as window'

const pathAlias = require('path-alias')
const { BrowserWindow } = require('electron')

const local = {}
const config = pathAlias('@app/config')

module.exports = { install }

function install (list) {
  list.autoUpdate = { create, close }
}

function create () {
  const window = createWindow()
  
  window.on('ready-to-show', show)
  window.loadURL(config.start.autoUpdate)

  local.window = window
  return window
}

function createWindow () {
  return new BrowserWindow({
    frame: false,
    show: false,
    transparent: true,
    height: 300,
    width: 560,
    webPreferences: {
      preload: pathAlias.resolve('@app/extra/ipcRenderer.js')
    }
  })
}

function close () {
  local.window.close()
}

function show () {
  const window = local.window

  window.setMenu(null)
  window.show()
}