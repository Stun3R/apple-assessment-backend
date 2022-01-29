'use strict'

const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const helmet = require('koa-helmet')
const { server, functions, database } = require('./config')
const registerApi = require('./api')

const koa = new Koa()

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

const start = async () => {
  /**
   * Add external logic before server start
   */
  await database.knex.migrate.latest()
  if (server.isDev) {
    await functions.seedProjects()
    await functions.seedAssignees()
  }

  return koa.listen(server.port)
}

start()
  .then(() => {
    console.log(`🚀 Server ready at http://localhost:${server.port}/`)
  })
  .catch((e) => {
    console.error('⛔️ Unable to start server:', e.message)
  })
