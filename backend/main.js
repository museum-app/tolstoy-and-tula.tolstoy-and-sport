const pathAlias = require('path-alias')
const { app } = require('electron')

const server = pathAlias('@app/core/server')
const events = pathAlias('@app/core/events')
const window = pathAlias('@app/core/window')

app.on('ready', start)

async function start () {
  events.install()

  await server.start()
  await window.autoUpdate()
}