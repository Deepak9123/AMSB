const _mongo = require('mongoose')
require('dotenv').config()
const _dbUrl = process.env.MONGOURL

const dbConnectionfun = _mongo
  .connect(_dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((data) => {
    console.log('DB Connected')
  })
  .catch((err) => {
    console.log('db connection issues', err)
  })

module.exports = dbConnectionfun
