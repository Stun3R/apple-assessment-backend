'use strict'

const { mocks } = require('../../helpers')

module.exports =
  ({ knex }) =>
  async () => {
    try {
      // check if table is empty
      const result = await knex('projects').select()
      if (result && result.length === 0) {
        const projects = mocks.projects(20)
        await knex('projects').insert(projects)
        console.log('📚 Successfully seed projects!')
      }
    } catch (e) {
      console.error("Couldn't seed projects properly", e)
    }
  }
