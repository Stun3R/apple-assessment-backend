'use strict'

require('dotenv').config()
const { join } = require('path')
const { loadFiles } = require('../helpers').loaders

// load modules (i.e: database & server configuration)
const modules = loadFiles({ dir: join(__dirname, 'modules') })

// load Bookshelf models
const models = loadFiles({
  dir: join(__dirname, '..', 'database', 'models'),
  dependency: modules.database.bookshelf,
  capitalize: true,
})

// load functions
const functions = loadFiles({
  dir: join(__dirname, 'functions'),
  dependency: modules.database,
})

module.exports = {
  ...modules,
  models,
  functions,
}
