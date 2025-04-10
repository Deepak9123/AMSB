const express = require('express')
const router = express.Router()
const enquiryController = require('../controllers/enquiryController')
const upload = require('../utils/multerConfig')

router.get('/test', enquiryController.testFunction)
router.get('/enquiry/list', enquiryController.getEnquiries)
router.post(
  '/submitForm',
  upload.fields([
    { name: 'familyPhoto', maxCount: 1 },
    { name: 'passportPhoto', maxCount: 1 }
  ]),
  enquiryController.submitEnquiryForm
)

module.exports = router
