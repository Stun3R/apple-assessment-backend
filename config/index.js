'use strict'

require('dotenv').config()
const { join } = require('path')
const { loadFiles } = require('../helpers').loaders

// load modules
const modules = loadFiles({ dir: join(__dirname, 'modules') })

const config = {
  ...modules,
}

module.exports = {
  ...config,
}
