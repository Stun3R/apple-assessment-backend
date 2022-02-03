'use strict'

const { find } = require('./controllers')

module.exports = (Router) => {
  const router = new Router({
    prefix: '/categories',
  })

  router.get('/', find)

  return router
}
