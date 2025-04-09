const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Dynamically create folders if they don't exist
const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath

    if (file.fieldname === 'familyPhoto') {
      uploadPath = 'public/uploads/familyPhoto'
    } else if (file.fieldname === 'passportPhoto') {
      uploadPath = 'public/uploads/passportPhoto'
    } else {
      uploadPath = 'public/uploads/others'
    }

    createDir(uploadPath)
    cb(null, uploadPath)
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${file.fieldname}${ext}`)
  }
})

const upload = multer({ storage })

module.exports = upload
