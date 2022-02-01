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
  const categories = await models.Project.query((qb) => {
    qb.groupBy('category')
    if (q) qb.where('category', 'LIKE', `%${q}%`)
    qb.count('id AS projects').from('projects')
  })
    .orderBy('category')
    .fetchAll({ columns: ['category as name'] })

  ctx.body = {
    data: categories,
    meta: {},
  }
}
