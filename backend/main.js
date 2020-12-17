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

  app.on('start', _ => {
    const main = local.window.main = window.main.create()

    main.on('ready-to-show', () => {
      if ( local.window.autoUpdate )
        local.window.autoUpdate.destroy()
    })
  })

  if ( process.argv.includes('--skip-update') )
    app.emit('start')
  else local.window.autoUpdate = window.autoUpdate.create()
}