'use strict'

const { mocks } = require('../../helpers')

module.exports =
  ({ knex }) =>
  async () => {
    try {
      // check if table is empty
      const result = await knex('assignees').select()
      if (result && result.length === 0) {
        const assignees = mocks.assignees(5)
        await knex('assignees').insert(assignees)
        console.log('🧐 Successfully seed assignees!')
      }
    } catch (e) {
      console.error("Couldn't seed assignees properly", e)
    }
  }
