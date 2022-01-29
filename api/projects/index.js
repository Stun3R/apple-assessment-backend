'use strict'

const { find, findById, create, update, destroy } = require('./controllers')

module.exports = (Router) => {
  const router = new Router({
    prefix: '/projects',
  })

  router.get('/', find)
  router.post('/', create)
  router.get('/:projectId', findById)
  router.put('/:projectId', update)
  router.delete('/:projectId', destroy)

  return router
}
