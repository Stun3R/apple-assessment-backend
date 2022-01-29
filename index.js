'use strict'

const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const helmet = require('koa-helmet')
const Router = require('koa-router')
const { isDev, port } = require('./config').server

const koa = new Koa()

// development middlewares usage
if (isDev) {
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

// apply router
koa.use(router.routes()).use(router.allowedMethods())

try {
  koa.listen(port, () =>
    console.log(`🚀 Server ready at http://localhost:${port}/`)
  )
} catch (e) {
  console.error('⛔️ Unable to start server:', e.message)
}
