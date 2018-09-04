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
  if (!Number.isInteger(snack_id)) return Promise.reject(new Error('reviewNotFound'))

  const bodyKeys = Object.keys(body).sort()
  if (!bodyKeys.includes('rating') || !bodyKeys.includes('text') || !bodyKeys.includes('title')) return Promise.reject(new Error('aFieldRequired'))

  const additionalKeys = bodyKeys.filter(word => ![ 'id', 'title', 'text', 'rating', 'snack_id' ].includes(word))
  if (additionalKeys.length !== 0) return Promise.reject(new Error('aFieldRequired'))

	return knex('reviews')
		.insert({snack_id, ...body})
		.returning(['*'])
}

function update(snack_id, id, body) {
  if (!body) return Promise.reject(new Error('aFieldRequired'))
  if (!Number.isInteger(snack_id) || !Number.isInteger(id)) return Promise.reject(new Error('reviewNotFound'))
  
  const additionalKeys = Object.keys(body).sort().filter(word => ![ 'title', 'text', 'rating' ].includes(word))
  if (additionalKeys.length !== 0) return Promise.reject(new Error('superfluousReviewFields'))

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
