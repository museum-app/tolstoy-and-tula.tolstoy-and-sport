const pathAlias = require('path-alias')
const express = require('express')

const config = pathAlias('@app/config')
const server = express()

const interfacePath = pathAlias.resolve('@interface')
const interface = express.static(interfacePath)

server.use(interface)


module.exports = { start }

function start () {
  return new Promise((resolve, reject) => {
    server.listen(config.server.port, config.server.host, (error) => {
      if ( error ) {
        console.error(error)
        return reject(error)
      }

      setTimeout(() => {
        return resolve(server)
      }, 100)
    })
  })
}