'use strict'

exports.up = function (knex) {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id')
    table.string('title', 20).notNullable()
    table.string('category').notNullable()
    table.timestamp('created_timestamp').defaultTo(knex.fn.now())
    table.timestamp('updated_timestamp')

    table.integer('assigned_to').references('assignees.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('projects')
}
