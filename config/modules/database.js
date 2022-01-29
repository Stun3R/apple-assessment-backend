'use strict'

const { environment } = require('./server')

const database = require('../../knexfile')
const knex = require('knex')(database[environment])
const bookshelf = require('bookshelf')(knex)

module.exports = {
  knex,
  bookshelf,
}
