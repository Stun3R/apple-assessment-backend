'use strict'

const { find } = require('./controllers')

module.exports = (Router) => {
  const router = new Router({
    prefix: '/projects',
  })

  router.get('/', find)

  return router
}
