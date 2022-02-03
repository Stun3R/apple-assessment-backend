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

/**
 * Apply here development middleware
 */
if (server.isDev) {
  koa.use(logger())
}

/**
 * Apply here global middleware
 */
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
