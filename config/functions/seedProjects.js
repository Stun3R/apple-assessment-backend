'use strict'

const { faker } = require('@faker-js/faker')
const { mocks } = require('../../helpers')

module.exports =
  ({ models, database }) =>
  async () => {
    try {
      /**
       * Retrieve projects to not erase previous data
       */
      const results = await models.Project.fetchAll()
      if (results && results.length === 0) {
        /**
         * Retrieve all assignees and add them to projects
         */
        const assignees = await models.Assignee.fetchAll()
        const rawAssignees = assignees.toJSON()
        /**
         * Get mocked project and map to add random assignee from assignees
         */
        const projects = mocks.projects(20).map((projects) => ({
          ...projects,
          assigned_to:
            rawAssignees.length !== 0
              ? faker.random.arrayElement(rawAssignees).id
              : null,
        }))
        /**
         * Bulk insert
         */
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
