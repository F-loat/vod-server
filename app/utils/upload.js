const fs = require('fs');
const path = require('path');
const config = require('config');
const multer = require('koa-multer');
const moment = require('moment');
const uuid = require('uuid/v4');

const uploadPath = config.get('uploadPath');

const getDatePath = () => {
  const date = moment().format('YYYY/MM/DD');
  let datePath = path.join(uploadPath, date);
  if (fs.existsSync(datePath)) return datePath;
  const pathArray = date.split('/');
  datePath = uploadPath;
  pathArray.forEach((item) => {
    datePath = path.join(datePath, item);
    if (!fs.existsSync(datePath)) fs.mkdirSync(datePath);
  });
  return datePath;
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, getDatePath());
  },
  filename(req, file, cb) {
    cb(null, uuid());
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
  getDatePath,
};
