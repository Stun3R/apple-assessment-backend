'use strict'

module.exports = (bookshelf) => {
  return bookshelf.model('Project', {
    tableName: 'projects',
    hasTimestamps: ['created_timestamp', 'updated_timestamp'],

    assignee_to: function () {
      return this.belongsTo('Assignee', 'assignee_to')
    },
  })
}
