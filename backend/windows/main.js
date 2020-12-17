'use as window'

const pathAlias = require('path-alias')
const { BrowserWindow } = require('electron')

const local = {}
const config = pathAlias('@app/config')

module.exports = { install }

function install (list) {
  list.main = { create }
}

function create () {
  const window = createWindow()
  
  window.on('ready-to-show', show)
  window.loadURL(config.start.main)

  local.window = window
  return window
}

function createWindow () {
  return new BrowserWindow({
    show: false,
    kiosk: true,
    height: 1080,
    width: 1920,
    webPreferences: {
      preload: pathAlias.resolve('@app/extra/ipcRenderer.js')
    }
  })
}

function show () {
  const window = local.window

  window.setMenu(null)
  window.maximize()
  window.show()
}