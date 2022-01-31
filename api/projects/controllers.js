'use strict'

const Boom = require('@hapi/boom')
const _ = require('lodash')
const { models } = require('../../config')
const { createPagination } = require('../../helpers')
const { creationSchema, updateSchema } = require('./schema')

exports.find = async (ctx) => {
  /**
   * Retrieve query params
   */
  const {
    pageSize = 10,
    current = 1,
    category,
    assigned_to,
    orderBy,
  } = ctx.query

  /**
   * Count total number of projects
   */
  const count = await models.Project.query((qb) => {
    if (category) qb.where('category', '=', category)
    if (assigned_to) qb.where('assigned_to', '=', assigned_to)
  }).count()

  /**
   * Handle pagination
   */
  const pagination = createPagination({ total: count, current, pageSize })

  /**
   * Create custom query with filters (category, assignee), sorts & pagination
   */
  const projects = await models.Project.query((qb) => {
    const offset = (pagination.current - 1) * pagination.pageSize
    qb.offset(offset).limit(pagination.pageSize)

    if (category) qb.where('category', '=', category)
    if (assigned_to) qb.where('assigned_to', '=', assigned_to)
  })
    .orderBy(orderBy || '')
    .fetchAll({
      withRelated: ['assigned_to'],
    })

  ctx.body = {
    data: projects,
    meta: {
      ...pagination,
    },
  }
}

exports.findById = async (ctx) => {
  /**
   * Retrieve params
   */
  const { projectId } = ctx.params

  try {
    const project = await models.Project.where({ id: projectId }).fetch({
      require: true,
      withRelated: ['assigned_to'],
    })
    ctx.body = project
  } catch (err) {
    throw err.message === 'EmptyResponse' ? Boom.notFound() : Boom.internal()
  }
}

exports.create = async (ctx) => {
  /**
   * Validate request body based on our validation schema
   */
  const { value, error } = creationSchema.validate(ctx.request.body)

  if (error) {
    throw Boom.badRequest()
  }

  if (_.isString(value.assigned_to)) {
    const assigned_to = await models.Assignee.forge({
      nickname: value.assigned_to,
    }).save()

    value.assigned_to = assigned_to.id
  }

  /**
   * Create new project & fetch Assignee
   */
  const project = await models.Project.forge(value).save()

  if (value.assigned_to) {
    await project.related('assigned_to').fetch()
  }

  ctx.status = 201
  ctx.body = project
}

exports.update = async (ctx) => {
  const { projectId } = ctx.params

  /**
   * Validate request body based on our validation schema
   */
  const { value, error } = updateSchema.validate(ctx.request.body)

  if (error) {
    throw Boom.badRequest()
  }

  /**
   * Update project & fetch Assignee
   */
  const project = await models.Project.where({ id: projectId }).save(value, {
    patch: true,
  })

  if (value.assigned_to) {
    await project.related('assigned_to').fetch()
  }

  ctx.body = project
}

exports.destroy = async (ctx) => {
  const { projectId } = ctx.params

  const project = await models.Project.where({ id: projectId }).destroy()

  ctx.status = 204
  ctx.body = project
}
