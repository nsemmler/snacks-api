const express = require('express')
const router = express.Router({ mergeParams: true })
const { reviewsController } = require('../controllers')


router.post('/', reviewsController.create)

router.patch('/:revId', reviewsController.update)
router.delete('/:revId', reviewsController.destroy)


module.exports = router
