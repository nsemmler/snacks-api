const { snack, review } = require('../models')
const { isValidSnackCreate, isValidSnackPatch } = require('../middleware/bodyInspect')

function create(req, res, next) {
	isValidReviewCreate(req.body)
		.then(() => snack.getSnackById(req.params.id))
		.then(() => review.create(req.params.id, req.body))
		.then(data => res.status(201).json({ data }))
		.catch(err => next(err))
}

function update(req, res, next) {
	isValidReviewPatch(req.body)
		.then(() => snack.getSnackById(req.params.id))
		.then(() => review.getReviewById(req.params.revId))
		.then(() => review.update(req.params.id, req.params.revId, req.body))
		.then(reviews => res.status(200).json({ data: reviews }))
		.catch(err => next(err))
}

function destroy(req, res, next) {
	snack.getSnackById(req.params.id)
		.then(() => review.getReviewById(req.params.revId))
		.then(() => review.update(req.params.id, req.params.revId, req.body))
		.then(reviews => res.status(202).json({ data: reviews }))
		.catch(err => next(err))
}

module.exports = {
	create,
	update,
	destroy
}
