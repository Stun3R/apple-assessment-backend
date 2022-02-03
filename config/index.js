'use strict'

require('dotenv').config()
const { join } = require('path')
const { loadFiles } = require('../helpers').loaders

/**
 * Load modules (database, server ect...)
 */
const modules = loadFiles({ dir: join(__dirname, 'modules') })

/**
 * Load bookshelf's modules
 */
const models = loadFiles({
  dir: join(__dirname, '..', 'database', 'models'),
  dependency: modules.database.bookshelf,
  capitalize: true,
})

const config = {
  ...modules,
  models,
}

/**
 * Load functions (starter, seeders etc...)
 */
const functions = loadFiles({
  dir: join(__dirname, 'functions'),
  dependency: config,
})

module.exports = {
  ...config,
  functions,
}
