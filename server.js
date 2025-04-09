const app = require('./src/app')
require('dotenv').config()

const PORT = process.env.PORT || 6600
// const PORT = 6600

app.listen(PORT, (err) => {
  if (err) {
    console.error('Server startup error:', err)
    process.exit(1)
  }
  console.log(`Server is running on port ${PORT}`)
})
