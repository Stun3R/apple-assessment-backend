'use strict'

const { models } = require('../../config')

exports.find = async (ctx) => {
  const projects = await models.Project.fetchAll({
    withRelated: ['assignee_to'],
  })

  ctx.body = projects
}
