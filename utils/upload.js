const fs = require('fs');
const path = require('path');
const config = require('config');
const multer  = require('multer');

const uploadPath = config.get('uploadPath');
const episodePath = path.join(uploadPath, 'episode');
const posterPath = path.join(uploadPath, 'poster');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
if (!fs.existsSync(episodePath)) fs.mkdirSync(episodePath);
if (!fs.existsSync(posterPath)) fs.mkdirSync(posterPath);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const basePath = path.join(uploadPath, file.fieldname);
    const yearPath = path.join(basePath, String(year));
    const monthPath = path.join(yearPath, String(month));
    const dayPath = path.join(monthPath, String(day));
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
