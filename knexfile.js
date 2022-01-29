'use strict'

require('dotenv').config()
const { join } = require('path')
const BASE_PATH = join(__dirname, 'database')

const defaultConfig = {
  migrations: {
    directory: join(BASE_PATH, 'migrations'),
  },
  seeds: {
    directory: join(BASE_PATH, 'seeds'),
  },
}
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data.db',
    },
    useNullAsDefault: true,
    ...defaultConfig,
  },
  test: {
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
    ...defaultConfig,
  },
  production: {
    client: process.env.DB_CLIENT || 'postgres',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'apple',
      user: process.env.DB_USER || 'apple',
      password: process.env.DB_PASSWORD || 'apple',
      ssl: false,
    },
    pool: {
      min: 2,
      max: 10,
    },
    ...defaultConfig,
  },
}
