const fs = require('fs');
const config = require('config');
const multer  = require('multer');

const uploadPath = config.get('uploadPath');
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const basePath = `${uploadPath}/${file.fieldname}`;
    const yearPath = `${basePath}/${year}`;
    const monthPath = `${basePath}/${year}/${month}`;
    const dayPath = `${basePath}/${year}/${month}/${day}`;
    if (!fs.existsSync(yearPath)) fs.mkdirSync(yearPath);
    if (!fs.existsSync(monthPath)) fs.mkdirSync(monthPath);
    if (!fs.existsSync(dayPath)) fs.mkdirSync(dayPath);
    cb(null, dayPath);
  },
  filename(req, file, cb) {
    if (file.fieldname === 'episode') {
      cb(null, file.originalname);
    } else {
      cb(null, String(Date.now()));
    }
  },
})

const upload = multer({ storage });

module.exports = upload;
