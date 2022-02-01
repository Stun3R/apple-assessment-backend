'use strict'

const { mocks } = require('../../helpers')

module.exports =
  ({ models, database }) =>
  async () => {
    try {
      // check if table is empty
      const results = await models.Project.fetchAll()
      if (results && results.length === 0) {
        const projects = mocks.projects(20)
        const Projects = database.bookshelf.Collection.extend({
          model: models.Project,
        })
        await Projects.forge(projects).invokeThen('save')
        console.log('📚 Successfully seed projects!')
      }
    } catch (e) {
      console.error("Couldn't seed projects properly", e)
    }
  }
