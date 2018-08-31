const express = require('express')
const router = express.Router()
const { snacksController } = require('../controllers')

router.get('/', snacksController.index)
// router.post('/', snacksController.create)

router.get('/:id', snacksController.show)
// router.patch('/:id', snacksController.update)
// router.delete('/:id', snacksController.destroy)

// router.get('/featured', snacksController.featured)

module.exports = router
