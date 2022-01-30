'use strict'

const { models } = require('../../config')

exports.find = async (ctx) => {
  /**
   * Retrieve query params
   */
  const { q } = ctx.query

  /**
   * Create custom query
   */
  const assignees = await models.Project.query((qb) => {
    qb.groupBy('category')
    if (q) qb.where('category', 'LIKE', `%${q}%`)
  })
    .orderBy('category')
    .fetchAll({ columns: ['category'] })

  ctx.body = {
    data: assignees,
    meta: {},
  }
}
