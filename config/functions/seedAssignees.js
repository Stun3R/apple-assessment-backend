'use strict'

const { mocks } = require('../../helpers')

module.exports =
  ({ models, database }) =>
  async () => {
    try {
      /**
       * Retrieve projects to not erase previous data
       */
      const results = await models.Assignee.fetchAll()
      if (results && results.length === 0) {
        /**
         * Get mocked assignees and bulk insert
         */
        const assignees = mocks.assignees(5)
        const Assignees = database.bookshelf.Collection.extend({
          model: models.Assignee,
        })
        await Assignees.forge(assignees).invokeThen('save')
        console.log('📚 Successfully seed assignees!')
      }
    } catch (e) {
      console.error("Couldn't seed assignees properly", e)
    }
  }
