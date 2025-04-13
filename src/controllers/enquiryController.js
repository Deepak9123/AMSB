const mongoose = require('mongoose')
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

    const formData = { ...req.body };

    formData.admissionStatus ='Pending'
    formData.paymentStatus ='Not Receive'

    if (req.files?.familyPhoto?.[0]) {
      formData.familyPhoto = `http://localhost:6600/AMS/enquiry/v1/uploads/familyPhoto/${req.files.familyPhoto[0].filename}`
    }

    if (req.files?.passportPhoto?.[0]) {
      formData.passportPhoto = `http://localhost:6600/AMS/enquiry/v1/uploads/passportPhoto/${req.files.passportPhoto[0].filename}`
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

// method for get enquiry data
const getEnquiries = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      enquiryFormId,
      studentName,
      adharCardNo,
      fatherMobileNo,
      motherMobileNo,
      email,
    } = req.query;

    const filters = {};

    if (enquiryFormId) filters.enquiryFormId = { $regex: enquiryFormId, $options: 'i' };
    if (studentName) filters.studentName = { $regex: studentName, $options: 'i' };
    if (adharCardNo) filters.adharCardNo = { $regex: adharCardNo, $options: 'i' };
    if (fatherMobileNo) filters.fatherMobileNo = { $regex: fatherMobileNo, $options: 'i' };
    if (motherMobileNo) filters.motherMobileNo = { $regex: motherMobileNo, $options: 'i' };
    if (email) filters.email = { $regex: email, $options: 'i' };

    const skip = (page - 1) * limit;

    const [total, enquiries] = await Promise.all([
      EnquiryForm.countDocuments(filters),
      EnquiryForm.find(filters)
        .select('-__v -_id') // 👌 Clean response
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
    ]);

    res.status(200).json({
      status:200,
      success: true,
      message: 'Enquiries fetched successfully',
      data: enquiries,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiry list',
      error: error.message,
    });
  }
};


// method for update enquiry data
const updateEnquiryForm = async (req, res) => {
  try {
    const {
      enquiryFormId, // custom ID field
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
    } = req.body;

    // Check if the enquiryFormId is provided
    if (!enquiryFormId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Enquiry Form ID is required to update the record.'
      });
    }

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
    };

    const missingFields = Object.entries(requiredFields)
      .filter(
        ([_, value]) =>
          !value || (typeof value === 'string' && value.trim() === '')
      )
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `Missing required field(s): ${missingFields.join(', ')}`
      });
    }

    // Find the existing enquiry form by custom enquiryFormId
    const existingEnquiry = await EnquiryForm.findOne({ enquiryFormId });
    if (!existingEnquiry) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Enquiry form not found.'
      });
    }

    // Prepare the updated data
    const updatedData = { ...req.body };

    // Handle file uploads (if any)
    if (req.files?.familyPhoto?.[0]) {
      updatedData.familyPhoto = `/AMS/enquiry/v1/uploads/familyPhoto/${req.files.familyPhoto[0].filename}`;
    } else {
      updatedData.familyPhoto = existingEnquiry.familyPhoto; // Keep the old photo
    }

    if (req.files?.passportPhoto?.[0]) {
      updatedData.passportPhoto = `/AMS/enquiry/v1/uploads/passportPhoto/${req.files.passportPhoto[0].filename}`;
    } else {
      updatedData.passportPhoto = existingEnquiry.passportPhoto; // Keep the old passport photo
    }

    // Update the record in the database
    const updatedEnquiry = await EnquiryForm.findOneAndUpdate(
      { enquiryFormId }, // Use custom enquiryFormId instead of _id
      updatedData,
      { new: true } // To return the updated record
    );

    if (!updatedEnquiry) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: 'Error updating the enquiry form.'
      });
    }

    // Return the updated enquiry form
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Enquiry form updated successfully.',
      data: updatedEnquiry
    });
  } catch (error) {
    console.error('Error updating enquiry form:', error);
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};



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

module.exports = { testFunction, submitEnquiryForm ,getEnquiries,updateEnquiryForm}
