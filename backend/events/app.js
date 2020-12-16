'use as event'

module.exports = { install }

function install ({app}) {
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}