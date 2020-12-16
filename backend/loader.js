const fs = require('fs')
const path = require('path')

module.exports = load

function load (dir, name, rows = 3) {
  const error = check(dir, name)
  
  if ( error !== false )
    throw error

  const files = loadDir(dir, name, rows)

  return function (...args) {
    files.forEach(file => {
      return file.install
        ? file.install(...args)
        : file
    })
  }
}

function check (dir, name) {
  if ( !dir )
    return new Error('Loading directory path is required!')

  if ( !name )
    return new Error('Loading namespace is required!')

  return false
}

function loadDir (dir, name, rows) {
  const result = []
  const files = scanDir(dir, name, rows)

  files.forEach(file => {
    let loaded = require(file)
    result.push(loaded)
  })

  return result
}

function scanDir (dir, name, rows) {
  const result = []
  for ( let file of fs.readdirSync(dir) ) {
    let filePath = path.join(dir, file)

    if ( fs.lstatSync(filePath).isDirectory()  ) {
      let extra = scanDir(filePath, name, rows)
      result.push(...extra)
    }
    
    else if ( hasUseName(filePath, name, rows) )
      result.push(filePath)
  }

  return result
}

function hasUseName (file, name, rows) {
  const fileData = fs.readFileSync(file)
  const fileRows = fileData.toString().split('\n')

  for ( let i = 0; i != Math.min(rows, fileRows.length); ++i ) {
    let string = fileRows[i]

    if ( testUseName(string, name) >= 0 )
      return true
  }

  return false
}

function testUseName (string, name) {
  const regex = new RegExp(`('|"|\`)(\\s){0,}use(\\s){1,}as(\\s){1,}${name}(\\s){0,}('|"|\`)`, 'gi')
  return string.search(regex)
}