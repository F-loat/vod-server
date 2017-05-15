const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const danmakuSchema = new Schema({
  player: { type: [String], index: true },
  author: { type: String },
  time: { type: Number },
  text: { type: String },
  color: { type: String },
  type: { type: String },
  ip: { type: String },
  referer: { type: String },
});

const Danmaku = mongoose.model('Danmaku', danmakuSchema);

module.exports = Danmaku;
