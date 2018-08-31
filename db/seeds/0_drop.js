exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviews').del().then(() => knex('snacks').del())
}
