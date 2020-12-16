const pathAlias = require('path-alias')

const load = pathAlias('@app/loader')

const windowsList = {}
const windowsDir = pathAlias.resolve('@app/windows')
const installWindows = load(windowsDir, 'window')

installWindows(windowsList)
module.exports = windowsList

