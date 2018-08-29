const { snack } = require('../models')
const { isValidSnackCreate, isValidSnackPatch } = require('../middleware/bodyInspect')

function index(req, res, next) {
	snack.index()
		.then(snacks => {
			let promises = snacks.map((snack) => {
				return review.getSnackReviews(snack.id)
					.then((reviews) => {
						snack.reviews = reviews
						return snack
					})
			})
			return Promise.all(promises)
		})
		.then(data => res.status(201).json({ data }))
		.catch(err => next(err))
}

module.exports = {
  index
}
