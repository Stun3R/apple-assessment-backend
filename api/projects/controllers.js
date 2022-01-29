'use strict'

const { models } = require('../../config')
const { createPagination } = require('../../helpers')

exports.find = async (ctx) => {
  /**
   * Retrieve query params
   */
  const { pageSize = 10, page = 1, category, assignee, orderBy } = ctx.query

  /**
   * Count total number of projects
   */
  const count = await models.Project.query((qb) => {
    if (category) qb.where('category', '=', category)
    if (assignee) qb.where('assignee_to', '=', assignee)
  }).count()

  /**
   * Handle pagination
   */
  const pagination = createPagination({ total: count, page, pageSize })

  /**
   * Create custom query with filters (category, assignee), sorts & pagination
   */
  const projects = await models.Project.query((qb) => {
    const offset = (pagination.page - 1) * pagination.pageSize
    qb.offset(offset).limit(pagination.pageSize)

    if (category) qb.where('category', '=', category)
    if (assignee) qb.where('assignee_to', '=', assignee)
  })
    .orderBy(orderBy)
    .fetchAll({
      withRelated: ['assignee_to'],
    })

  ctx.body = {
    data: projects,
    meta: {
      ...pagination,
    },
  }
}
