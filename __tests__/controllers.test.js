/* eslint-disable no-undef */
'use strict'

const request = require('supertest')
const koa = require('../server')
const { database, functions, models } = require('../config')
const { knex } = database

describe('Controllers', () => {
  beforeAll(async () => {
    await knex.migrate.latest()
    await functions.seedProjects()
    await functions.seedAssignees()
  })

  describe('Projects', () => {
    test('projects - find', async () => {
      const response = await request(koa.callback()).get('/projects')

      expect(response.status).toBe(200)

      expect(response.body).toHaveProperty('data')
      expect(response.body).toHaveProperty('meta')
      expect(response.body.data.length).toBeGreaterThanOrEqual(0)
    })

    test('projects - findById', async () => {
      const project = await models.Project.where({ id: 1 }).fetch({
        columns: ['id', 'title', 'category', 'assigned_to'],
        withRelated: ['assigned_to'],
      })

      const response = await request(koa.callback()).get('/projects/1')

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject(project.toJSON())
    })

    test('projects - create', async () => {
      const payload = { title: 'Apple Unit Testing', category: 'IT' }

      const response = await request(koa.callback())
        .post('/projects')
        .send(payload)

      expect(response.status).toBe(201)
      expect(response.body).toMatchObject(payload)
    })

    test('projects - update', async () => {
      const project = await models.Project.where({ id: 1 }).fetch({
        columns: ['id', 'title', 'category', 'assigned_to'],
        withRelated: ['assigned_to'],
      })

      const payload = { title: 'Apple Unit Testing', category: 'IT' }

      const response = await request(koa.callback())
        .put('/projects/1')
        .send(payload)

      expect(response.status).toBe(200)
      expect(project).not.toMatchObject(response.body)
      expect(response.body).toMatchObject(payload)
    })

    test('projects - delete', async () => {
      const response = await request(koa.callback()).delete('/projects/1')

      const project = await models.Project.where({ id: 1 }).fetch({
        columns: ['id', 'title', 'category', 'assigned_to'],
        withRelated: ['assigned_to'],
        require: false,
      })

      expect(response.status).toBe(204)
      expect(project).toBe(null)
    })
  })

  describe('Assignees', () => {
    test('assignees - find', async () => {
      const response = await request(koa.callback()).get('/assignees')

      expect(response.status).toBe(200)

      expect(response.body).toHaveProperty('data')
      expect(response.body).toHaveProperty('meta')
      expect(response.body.data.length).toBeGreaterThanOrEqual(0)
    })

    test('assignees - create', async () => {
      const payload = { nickname: 'John Doe' }

      const response = await request(koa.callback())
        .post('/assignees')
        .send(payload)

      expect(response.status).toBe(201)
      expect(response.body).toMatchObject(payload)
    })
  })

  afterAll((done) => {
    knex.destroy()
    done()
  })
})
