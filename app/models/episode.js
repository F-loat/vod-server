const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * @param name            {String}    标题
 * @param belong          {ObjectId}  所属视频
 * @param path            {String}    文件位置
 * @param progress        {Number}    转码进度
 * @param state           {Number}    状态
 * @param creater         {ObjectId}  创建者
 * @param createdAt       {Date}      创建时间
 * @param updatedAt       {Date}      更新时间
 */

const episodeSchema = new Schema({
  name: { type: String },
  belong: { type: ObjectId, ref: 'Video' },
  path: { type: String },
  progress: { type: Number },
  state: { type: Number, default: 0 },
  creater: { type: ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

episodeSchema.pre('save', function replace(next) {
  const filePath = this.filePath;
  this.filePath = filePath && filePath.replace(/\\/g, '/');
  next();
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;
