'use as event'

const { app } = require('electron')
const pathAlias = require('path-alias')
const ipc = pathAlias('@app/extra/ipcMain')

module.exports = { install }

function install () {
  ipc.async('get-version', getVersion)
}

function getVersion () {
  return app.getVersion()
}