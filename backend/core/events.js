const electron = require('electron')
const pathAlias = require('path-alias')

const load = pathAlias('@app/loader')

const eventsDir = pathAlias.resolve('@app/events')
const installEvents = load(eventsDir, 'event')

module.exports = { install }

function install () {
  installEvents(electron)
}

