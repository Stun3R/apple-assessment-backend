'use strict'

const Koa = require('koa')
const cors = require('@koa/cors')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const helmet = require('koa-helmet')
const errorMiddleware = require('./middleware/error')
const registerApi = require('./api')
const { server } = require('./config')

const koa = new Koa()

koa.use(errorMiddleware)
koa.use(cors())

// development middlewares usage
if (server.isDev) {
  koa.use(logger())
}

// apply global middlewares
koa
  .use(
    bodyParser({
      enableTypes: ['json'],
    })
  )
  .use(helmet())

/**
 * register all routes
 */
registerApi(koa)

module.exports = koa
