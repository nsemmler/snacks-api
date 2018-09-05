const { snack, review } = require('../models')
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

async function show(req, res, next) {
	let data
	const id = parseInt(req.params.id)

	snack.getSnackById(id)
		.then(found => data = found)
		.then(() => review.getSnackReviews(id))
		.then(reviews => data.reviews = reviews)
		.then(() => res.status(201).json({ data }))
		.catch(err => next(err))
}

function featured(req, res, next) {
	snack.getFeatured()
		.then(data => res.status(201).json({ data }))
		.catch(err => next(err))
}

function create(req, res, next) {
	isValidSnackCreate(req.body)
		.then(() => snack.create(req.body))
		.then(data => res.status(201).json({ data }))
		.catch(err => next(err))
}

function update(req, res, next) {
	const id = parseInt(req.params.id)

	isValidSnackPatch(req.body)
		.then(() => snack.getSnackById(id))
		.then(() => snack.update(id, req.body))
		.then(data => res.status(200).json({ data }))
		.catch(err => next(err))
}

function destroy(req, res, next) {
	const id = parseInt(req.params.id)

	snack.getSnackById(id)
  	.then(() => snack.destroy(id))
		.then(data => res.status(202).json({ data }))
		.catch(err => next(err))
}

module.exports = {
	index,
	show,
	featured,
	create,
	update,
	destroy
}
