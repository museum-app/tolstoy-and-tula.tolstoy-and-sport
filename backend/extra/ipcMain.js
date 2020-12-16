const { ipcMain } = require('electron')

module.exports = { sync, async }

function sync (channel, callback) {
  ipcMain.on(channel, async (event, ...data) => {
    const result = callback(...data)
    const answer = await responseOf(result)

    event.returnValue = answer
  })
}

function async (channel, callback) {
  ipcMain.on(channel, async (event, id, ...data) => {
    const result = callback(...data)
    const answer = await responseOf(result)

    event.reply(`${channel}-${id}`, answer)
  })
}


async function responseOf (result) {
  if ( isNaN(result) || result === undefined || result.then === undefined )
    return result
  else return await result
}