'use strict'

const Boom = require('@hapi/boom')
const { models } = require('../../config')
const schema = require('./schema')

exports.find = async (ctx) => {
  /**
   * Retrieve query params
   */
  const { q, orderBy } = ctx.query

  /**
   * Create custom query with filters (category, assignee), sorts & pagination
   */
  const assignees = await models.Assignee.query((qb) => {
    if (q) qb.where('nickname', 'LIKE', `%${q}%`)
  })
    .orderBy(orderBy)
    .fetchAll()

  ctx.body = {
    data: assignees,
    meta: {},
  }
}

exports.create = async (ctx) => {
  /**
   * Validate request body based on our validation schema
   */
  const { value, error } = schema.validate(ctx.request.body)

  if (error) {
    throw Boom.badRequest()
  }

  /**
   * Create new assignee & fetch Assignee
   */
  try {
    const assignee = await models.Assignee.forge(value).save()

    ctx.status = 201
    ctx.body = assignee
  } catch (err) {
    throw err.message.includes('UNIQUE')
      ? Boom.badRequest('This assignee already exist')
      : Boom.internal()
  }
}
