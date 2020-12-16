'use as event'

const pathAlias = require('path-alias')
const ipc = pathAlias('@app/extra/ipcMain')

const local = {
  status: 0
}

module.exports = { install }

function install () {
  ipc.async('start-update', start)
  ipc.async('skip-update', startApp)
  ipc.async('update-status', getStatus)
}

function start () {
  // TODO: updater code
}

function startApp () {
  local.status = 3
}

function getStatus () {
  return local.status
}