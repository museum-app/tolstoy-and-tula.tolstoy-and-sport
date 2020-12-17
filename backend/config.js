const { screen } = require('electron')

module.exports = {
  display: { size },
  repo: "museum-app/tolstoy-and-tula.tolstoy-and-sport",
  start: {
    main: 'http://127.0.0.1:8090/main.html',
    autoUpdate: 'http://127.0.0.1:8090/auto-update.html'
  },

  server: {
    port: 8090,
    host: '127.0.0.1'
  }
}

function size () {
  const display = screen.getPrimaryDisplay()

  return display.size
}