'use strict'

module.exports = (bookshelf) => {
  return bookshelf.model('Assignee', {
    tableName: 'assignees',
    hasTimestamps: false,

    projects: function () {
      return this.hasMany('Project', 'assigned_to')
    },
  })
}
