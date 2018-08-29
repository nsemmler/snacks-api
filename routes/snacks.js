const express = require('express')
const router = express.Router()
const { snacksController } = require('../controllers')

router.get('/', snacksController.index)

module.exports = router
