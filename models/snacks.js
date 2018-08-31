const knex = require('../db/knex')

function index () {
  return knex('snacks').orderBy('id', 'asc') // SELECT * FROM snacks
}

function create (body) {
  const fields = [ 'name', 'description', 'price', 'img', 'is_perishable' ]
  if (!fields.every(field => body[field])) return Promise.reject(new Error('aFieldRequired'))
  if (!Object.keys(body).every(field => fields.includes(field))) return Promise.reject(new Error('superfluousSnackFields'))

  return knex('snacks')
		.insert( body )
		.returning(['*'])
}

function update (id, body) {
  if (!Number.isInteger(id)) return Promise.reject(new Error('snackNotFound'))

  const fields = [ 'name', 'description', 'price', 'img', 'is_perishable' ]
  if (Object.keys(body).length === 0) return Promise.reject(new Error('aFieldRequired'))
  if (!Object.keys(body).every(field => fields.includes(field))) return Promise.reject(new Error('superfluousSnackFields'))

  return knex('snacks')
		.where({ id })
		.update( body )
		.returning(['*'])
}

function destroy (id) {
  if (!Number.isInteger(id)) return Promise.reject(new Error('snackNotFound'))

  return knex('snacks')
		.where({ id })
		.del()
		.returning(['*'])
}

function getSnackById(id) {
  if (!Number.isInteger(id)) return Promise.reject(new Error('snackNotFound'))

	return knex('snacks')
		.where({ id })
		.first()
		.then(snack => {
			if (!snack) throw new Error('snackNotFound')
			return snack
		})
}

function getFeatured() {
	return knex('snacks')
		.then(snacks => {
			const ids = [ generateRandomId(snacks.length), generateRandomId(snacks.length), generateRandomId(snacks.length) ]
			return [ snacks[ids[0]], snacks[ids[1]], snacks[ids[2]] ]
		})
}

function generateRandomId(snackQty) {
  if (!Number.isInteger(snackQty) || snackQty < 0) return Promise.reject(new Error('invalidQuantity'))
	return Math.ceil(Math.random() * snackQty)
}

module.exports = {
  index,
  create,
  update,
  destroy,
  getSnackById,
  getFeatured,
  generateRandomId
}
