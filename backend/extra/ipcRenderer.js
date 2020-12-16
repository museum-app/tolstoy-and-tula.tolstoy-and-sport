const { ipcRenderer } = require('electron')

const local = {
  lastId: Date.now()
}

window.ipc = {
  async: ipcAsync,
  
  on: ipcRenderer.on,
  once: ipcRenderer.once,
  sync: ipcRenderer.sendSync
}

function ipcAsync (channel, ...data) {
  return new Promise(async resolve => {
    const id = unique()

    ipcRenderer.send(channel, id, ...data)
    ipcRenderer.once(`${channel}-${id}`, (_, ...data) => {
      resolve(...data)
    })
  })
}

function unique () {
  local.lastId = Date.now() <= local.lastId
    ? local.lastId + 1
    : Date.now()
    
  return local.lastId.toString(36)
}