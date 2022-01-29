'use strict'

const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const helmet = require('koa-helmet')
const Router = require('koa-router')
const { server, functions, database, models } = require('./config')

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

const router = new Router()

router.get('/', (ctx) => {
  ctx.body = {
    message: 'Hello World',
  }
})

router.get('/projects', async (ctx) => {
  const projects = await models.Project.fetchAll({
    withRelated: ['assignee_to'],
  })

  ctx.body = projects
})

// apply router
koa.use(router.routes()).use(router.allowedMethods())

const start = async () => {
  /**
   * Add external logic before server start
   */
  await database.knex.migrate.latest()
  await functions.seedProjects()
  await functions.seedAssignees()

  return koa.listen(server.port)
}

start()
  .then(() => {
    console.log(`🚀 Server ready at http://localhost:${server.port}/`)
  })
  .catch((e) => {
    console.error('⛔️ Unable to start server:', e.message)
  })
