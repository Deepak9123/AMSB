const multer = require('multer')
const path = require('path')
const EnquiryForm = require('../models/enquirySchema')

//  method for enquiry form submit
const submitEnquiryForm = async (req, res) => {
  try {
    const {
      studentName,
      adharCardNo,
      std,
      dob,
      email,
      fatherName,
      fatherAdharCardNo,
      fatherMobileNo,
      fatherEmail,
      motherName,
      motherAdharCardNo,
      motherMobileNo,
      motherEmail,
      placeOfBirth,
      pincode,
      city,
      district,
      state,
      religion,
      motherTongue
    } = req.body

    // Required fields map
    const requiredFields = {
      studentName,
      adharCardNo,
      std,
      dob,
      email,
      fatherName,
      fatherAdharCardNo,
      fatherMobileNo,
      fatherEmail,
      motherName,
      motherAdharCardNo,
      motherMobileNo,
      motherEmail,
      placeOfBirth,
      pincode,
      city,
      district,
      state,
      religion,
      motherTongue
    }

    const missingFields = Object.entries(requiredFields)
      .filter(
        ([_, value]) =>
          !value || (typeof value === 'string' && value.trim() === '')
      )
      .map(([key]) => key)

    if (missingFields.length > 0) {
      return res.status(200).json({
        status: 400,
        success: false,
        message: `Missing required field(s): ${missingFields.join(', ')}`
      })
    }

    const formData = { ...req.body }

    if (req.files?.familyPhoto?.[0]) {
      formData.familyPhoto = `/AMS/enquiry/v1/uploads/familyPhoto/${req.files.familyPhoto[0].filename}`
    }

    if (req.files?.passportPhoto?.[0]) {
      formData.passportPhoto = `/AMS/enquiry/v1/uploads/passportPhoto/${req.files.passportPhoto[0].filename}`
    }

    const newEnquiry = new EnquiryForm(formData)
    await newEnquiry.save()

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Enquiry form submitted successfully.',
      data: newEnquiry
    })
  } catch (error) {
    console.error('Error submitting enquiry form:', error)
    res.status(500).json({
      staus: 500,
      success: false,
      message: error.message,
      error: error.message
    })
  }
}

// Testing Application And Services
const testFunction = async (req, res) => {
  try {
    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Backend Services</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f4f4f4;
              }
              .container {
                text-align: center;
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>🚀 Services is Running!</h1>
            </div>
          </body>
          </html>
        `)
  } catch (error) {
    res.status(500).send({ staus: 500, message: error.message })
  }
}

module.exports = { testFunction, submitEnquiryForm }
