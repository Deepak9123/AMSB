const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
require('dotenv').config()

const enquiryRoutes = require('./routes/enquiryRouter')

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(compression())

app.use('/AMS/enquiry/v1/', enquiryRoutes)

module.exports = app
