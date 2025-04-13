const mongoose = require('mongoose')

const enquiryFormSchema = new mongoose.Schema({
  enquiryFormId: {
    type: String,
    unique: true
  },
  studentName: { type: String, required: true },
  adharCardNo: { type: String, required: true, match: /^[0-9]{12}$/ },
  std: { type: String, required: true },
  dob: { type: String, required: true },
  email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
  pwd: String,
  appId: String,
  udise: String,
  classOfStudent: String,
  fatherName: { type: String, required: true },
  fatherAdharCardNo: { type: String, required: true, match: /^[0-9]{12}$/ },
  fatherMobileNo: { type: String, required: true, match: /^[6-9]\d{9}$/ },
  fatherEmail: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
  motherName: { type: String, required: true },
  motherAdharCardNo: { type: String, required: true, match: /^[0-9]{12}$/ },
  motherMobileNo: { type: String, required: true, match: /^[6-9]\d{9}$/ },
  motherEmail: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
  placeOfBirth: { type: String, required: true },
  pincode: { type: String, required: true, match: /^[1-9][0-9]{5}$/ },
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  religion: { type: String, required: true },
  motherTongue: { type: String, required: true },
  familyPhoto: { type: String },
  passportPhoto: { type: String },
  admissionStatus: { type: String },
  paymentStatus: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

enquiryFormSchema.pre('save', async function (next) {
  if (!this.enquiryFormId) {
    const count = await mongoose.model('EnquiryForm').countDocuments()
    const prefix = 'ENQ'
    const padded = String(count + 1).padStart(4, '0')
    const date = new Date().toLocaleDateString('en-GB').replace(/\//g, '/')
    this.enquiryFormId = `${prefix}-${padded}-${date}`
  }
  next()
})

module.exports = mongoose.model('EnquiryForm', enquiryFormSchema)
