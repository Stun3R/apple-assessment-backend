'use strict'

exports.up = function (knex) {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id')
    table.string('title', 20).notNullable().unique()
    table.string('category').notNullable()
    table.timestamp('created_timestamp').defaultTo(knex.fn.now())
    table.timestamp('update_timestamp')

    table.integer('assignee_to').references('assignees.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('projects')
}
