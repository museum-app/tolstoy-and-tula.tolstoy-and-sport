const path = require('path')
const pathAlias = require('path-alias')

const rootPath = __dirname
const appPath = path.join(rootPath, 'backend')
const interfacePath = path.join(rootPath, 'interface')

pathAlias.setAlias('root', rootPath)
pathAlias.setAlias('app', appPath)
pathAlias.setAlias('interface', interfacePath)

pathAlias('@app/main')