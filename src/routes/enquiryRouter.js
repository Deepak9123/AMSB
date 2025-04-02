const express = require('express')
const router = express.Router()
const enquiryController = require('../controllers/enquiryController')

router.get('/test', enquiryController.testFunction)

module.exports = router
