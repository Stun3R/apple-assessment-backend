exports.up = function (knex) {
  return knex.schema.createTable('assignees', (table) => {
    table.increments('id')
    table.string('nickname', 20).unique().notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('assignees')
}
