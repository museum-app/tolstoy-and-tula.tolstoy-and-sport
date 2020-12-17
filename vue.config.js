const path = require('path')
const root = __dirname

module.exports = {
  publicPath: '/',
  filenameHashing: false,
  productionSourceMap: false,
  outputDir: path.join(root, 'interface'),

  pages: getPages(),
  configureWebpack: getConfigureWebpack()
}

function getPages () {
  return {
    autoUpdate: {
      entry: path.join(root, 'frontend', 'auto-update.js'),
      template: path.join(root, 'public', 'index.pug'),
      filename: 'auto-update.html'
    },

    main: {
      entry: path.join(root, 'frontend', 'main.js'),
      template: path.join(root, 'public', 'index.pug'),
      filename: 'main.html'
    }
  }
}

function getConfigureWebpack () {
  return {
    resolve: {
      alias: {
        'root': root,
        ':root': root,

        'src': path.join(root, 'frontend'),
        ':src': path.join(root, 'frontend'),

        'assets': path.join(root, 'frontend/assets'),
        ':assets': path.join(root, 'frontend/assets'),

        'au': path.join(root, 'frontend/auto-update'),
        ':au': path.join(root, 'frontend/auto-update'),

        'main': path.join(root, 'frontend/main'),
        ':main': path.join(root, 'frontend/main')
      }
    }
  }
}