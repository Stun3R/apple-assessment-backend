/* eslint-disable no-undef */
'use strict'

const { fakeTitle, mocks, createPagination, loaders } = require('../helpers')
const { faker } = require('@faker-js/faker')

const { join } = require('path')

describe('Helpers', () => {
  describe('pagination - create a valid pagination', () => {
    test('invalid page number should be returned as 1', () => {
      const result = createPagination({ total: 10, page: -1, pageSize: 10 })
      expect(result).toEqual({
        total: 10,
        page: 1,
        pageSize: 10,
        pageCount: 1,
      })
    })

    test('pageSize > 100 should be returned as 100', () => {
      const result = createPagination({ total: 10, page: 1, pageSize: 150 })
      expect(result).toEqual({
        total: 10,
        page: 1,
        pageSize: 100,
        pageCount: 1,
      })
    })

    test('pageSize -1 should return equal to total', () => {
      const result = createPagination({ total: 10, page: 1, pageSize: -1 })
      expect(result).toEqual({
        total: 10,
        page: 1,
        pageSize: 10,
        pageCount: 1,
      })
    })

    test('pageCount should total divided by pageSize', () => {
      const result = createPagination({ total: 10, page: 1, pageSize: 5 })
      expect(result).toEqual({
        total: 10,
        page: 1,
        pageSize: 5,
        pageCount: 2,
      })
    })
  })

  describe('loaders', () => {
    test('should load all JS files in specified folder', () => {
      const dir = join(__dirname, 'mocks', 'loaders')
      const load = loaders.loadFiles({
        dir,
      })

      expect(load).toEqual({ leet: { foo: 'bar' } })
    })
  })

  describe('fakeTitle', () => {
    test('should return a formatted title with a length <= 20', () => {
      const title = fakeTitle(faker.name.title(), 20)

      expect(title.length).toBeLessThanOrEqual(20)
    })
  })

  describe('mocks', () => {
    test('projects - mocks a chosen amount of projects', () => {
      const projects = mocks.projects(20)

      expect(projects.length).toEqual(20)
    })

    test('assignees - mocks a chosen amount of assignees', () => {
      const assignees = mocks.assignees(20)

      expect(assignees.length).toEqual(20)
    })
  })
})
