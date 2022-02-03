'use strict'

const { loadFiles } = require('../helpers').loaders
const Router = require('koa-router')

module.exports = (koa) => {
  const router = new Router()

  /**
   * Load all routes inside api subfolder
   */
  const subRoutes = loadFiles({ dir: __dirname, dependency: Router })

  /**
   * Transform given object to array in order to iterate & register their routes
   */
  Object.values(subRoutes).forEach((subRoute) => {
    router.use(subRoute.routes())
  })

  /**
   * Register `koa-router` routes to the server
   */
  koa.use(router.routes()).use(router.allowedMethods())
}
