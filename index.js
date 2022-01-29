'use strict'

const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const helmet = require('koa-helmet')
const Router = require('koa-router')

const koa = new Koa()

// development middlewares usage
if (process.env.NODE_ENV === 'development') {
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

koa.listen(process.env.PORT || 1337, () =>
  console.log('🚀 Server ready at http://localhost:1337/')
)
