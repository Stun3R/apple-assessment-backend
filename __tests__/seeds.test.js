/* eslint-disable no-undef */
'use strict'

const { database, functions } = require('../config')
const { knex } = database

describe('Seeds', () => {
  beforeAll(async () => {
    await knex.migrate.latest()
  })

  describe('Migrations', () => {
    test('check if project table has been created', async () => {
      const projects = await knex.from('projects').select('title')
      expect(projects.length).toEqual(0)
    })

    test('check if assignee table has been created', async () => {
      const assignees = await knex.from('assignees').select('nickname')
      expect(assignees.length).toEqual(0)
    })
  })

  test('seedProjects - it should seed the project table', async () => {
    await functions.seedProjects()
    const projects = await knex.from('projects').select('title')
    expect(projects.length).not.toEqual(0)
  })

  test('seedAssignees - it should seed the assignee table', async () => {
    await functions.seedAssignees()
    const assignees = await knex.from('assignees').select('nickname')
    expect(assignees.length).not.toEqual(0)
  })

  afterAll((done) => {
    knex.destroy()
    done()
  })
})
