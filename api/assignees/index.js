'use strict'

const { find, create } = require('./controllers')

module.exports = (Router) => {
  const router = new Router({
    prefix: '/assignees',
  })

  router.get('/', find)
  router.post('/', create)

  return router
}
