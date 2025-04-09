const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
require('dotenv').config()
require('../src/config/dbConfig')

const enquiryRoutes = require('./routes/enquiryRouter')

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(compression())

app.use('/AMS/enquiry/v1/', enquiryRoutes)
app.use('/AMS/enquiry/v1/uploads', express.static('public/uploads'))

module.exports = app
