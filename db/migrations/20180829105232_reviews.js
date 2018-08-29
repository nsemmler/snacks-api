exports.up = function(knex, Promise) {
    return knex.schema.createTable('reviews', (table) => {
      table.increments()
      table.string('title').notNullable().defaultTo('')
      table.text('text').notNullable().defaultTo('')
      table.integer('rating').notNullable()
      table.integer('snack_id').notNullable()
      table.foreign('snack_id').references('snacks.id').onDelete('CASCADE')
    })
  }

  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reviews')
  }
