const knex = require('../db/knex')

function getSnackReviews(id) {
  if (!Number.isInteger(id)) return Promise.reject(new Error('reviewNotFound'))

  return knex('reviews')
    .where({ 'snack_id': id })
}

function getReviewById(id) {
  if (!Number.isInteger(id)) return Promise.reject(new Error('reviewNotFound'))

	return knex('reviews')
		.where({ id })
		.first()
		.then(foundReview => {
			if (!foundReview) throw new Error('reviewNotFound')
			return foundReview
		})
}

function create(snack_id, body) {
	return knex('reviews')
		.insert({snack_id, ...body})
		.returning(['*'])
}

function update(snack_id, id, body) {
  if (!Number.isInteger(id)) return Promise.reject(new Error('reviewNotFound'))

	return knex('reviews')
		.where({ id })
		.update( body )
		.returning(['*'])
}

function destroy(snack_id, id) {
  if (!Number.isInteger(id)) return Promise.reject(new Error('reviewNotFound'))

	return knex('reviews')
		.where({ snack_id, id })
		.del()
		.returning(['*'])
}

module.exports = {
  getSnackReviews,
  getReviewById,
  create,
  update,
  destroy
}
