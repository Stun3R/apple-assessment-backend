'use strict'

module.exports = (bookshelf) => {
  return bookshelf.model('Assignee', {
    tableName: 'assignees',
    hasTimestamps: true,

    projects: () => {
      return this.hasMany('Project')
    },
  })
}
