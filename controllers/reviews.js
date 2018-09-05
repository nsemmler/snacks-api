const { snack, review } = require('../models')
const { isValidReviewCreate, isValidReviewPatch } = require('../middleware/bodyInspect')

function create(req, res, next) {
	const id = parseInt(req.params.id)

	isValidReviewCreate(req.body)
		.then(() => snack.getSnackById(id))
		.then(() => review.create(id, req.body))
		.then(data => res.status(201).json({ data }))
		.catch(err => next(err))
}

function update(req, res, next) {
	const id = parseInt(req.params.id)
	const revId = parseInt(req.params.revId)

	isValidReviewPatch(req.body)
		.then(() => snack.getSnackById(id))
		.then(() => review.getReviewById(revId))
		.then(() => review.update(revId, req.body))
		.then(reviews => res.status(200).json({ data: reviews }))
		.catch(err => next(err))
}

function destroy(req, res, next) {
	const revId = parseInt(req.params.revId)

	review.destroy(revId)
		.then(reviews => res.status(202).json({ data: reviews }))
		.catch(err => next(err))
}

module.exports = {
	create,
	update,
	destroy
}
