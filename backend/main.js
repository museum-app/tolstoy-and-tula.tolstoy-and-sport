const pathAlias = require('path-alias')
const { app } = require('electron')

const server = pathAlias('@app/core/server')
const events = pathAlias('@app/core/events')
const window = pathAlias('@app/core/window')

const local = {
  window: {}
}

app.on('ready', start)
async function start () {
  events.install()

  await server.start()

  if ( process.argv.includes('--skip-update') )
    app.emit('start')
  else local.window.autoUpdate = window.autoUpdate.create()

  app.on('start', () => {
    const mainWindow = window.main.create()

    mainWindow.on('ready-to-show', () => {
      mainWindow.setMenu(null)
      mainWindow.show()
      mainWindow.maximize()

      local.window.autoUpdate.destroy()
    })
  })
}