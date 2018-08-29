const knex = require('../db/knex')

function index () {
  return knex('snacks') // SELECT * FROM snacks
}

module.exports = {
  index
}
