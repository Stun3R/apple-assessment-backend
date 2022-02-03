'use strict'

const { server, functions, database } = require('./config')
const koa = require('./server')

const start = async () => {
  /**
   * Add external logic before server start
   */
  await database.knex.migrate.latest()
  if (!server.isProd) {
    await functions.seedAssignees()
    await functions.seedProjects()
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
