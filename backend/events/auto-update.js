'use as event'

const fs = require('fs')
const path = require('path')

const { app } = require('electron')
const request = require('request')
const pathAlias = require('path-alias')
const AdmZip  = require('adm-zip')

const config = pathAlias('@app/config')
const ipc = pathAlias('@app/extra/ipcMain')

const local = {
  status: 0
}

module.exports = { install }

function install () {
  local.net = require('electron').net

  ipc.async('start-update', start)
  ipc.async('skip-update', startApp)
  ipc.async('update-status', getStatus)
}

async function start () {
  const latest = await openUrl(`https://api.github.com/repos/${config.repo}/releases/latest`)

  if ( latest === false )
    return startApp()

  const release = JSON.parse(latest)
  checkUpdate(release)
}

function getStatus () {
  return local.status
}

function startApp () {
  local.status = 3
  app.emit('start')
}

function restart () {
  local.status = 3
  app.relaunch({
    args: process.argv.slice(1).concat(['--skip-update'])
  })

  setTimeout(() => {
    app.exit(0)
  }, 1500)
}

async function checkUpdate (release) {
  for ( let file of release.assets ) {
    if ( file.name === 'package.json' ) {
      let data = await openUrl(file.browser_download_url)
      let package = JSON.parse(data)

      if ( package.version > app.getVersion() ) {
        appUpdate(release)
        return local.status = 1
      }
      
      else return startApp()
    }
  }
}

async function appUpdate (release) {
  const resources = await getResources(release)
  const updates = new AdmZip(resources)
  const target = pathAlias.resolve('@root')

  local.status = 2
  updates.extractAllTo(target, true)

  return restart()
}

async function getResources (release) {
  for ( let file of release.assets ) {
    if ( file.name === 'resources.app.zip' ) {
      const tempFolder = app.getPath('temp')
      const releasePath = path.join(tempFolder, 'resources.app.zip')

      await dowload(file.browser_download_url, releasePath)
      return releasePath
    }
  }
}

function openUrl (url, tryN = 0) {
  return new Promise(resolve => {
    let data = ''
    let { net } = local
    let request = net.request(url)

    request.on('response', response => {
      response.on('data', chunk => data += chunk)
      response.on('end', () => {
        resolve(data)
      })
    })

    request.on('error', async _ => {
      if ( tryN === 2 )
        return resolve(false)

      setTimeout(async () => {
        const retry = await openUrl(url, ++tryN)
        return resolve(retry)
      }, 5000)
    })

    request.end()
  })
}

function dowload (url, target) {
  return new Promise(resolve => {
    request.head(url, _ => {
      request(url)
        .pipe(fs.createWriteStream(target))
        .on('close', resolve)
    })
  })
}