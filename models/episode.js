const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * @param name            {String}    标题
 * @param state           {Number}    状态
 * @param video           {ObjectId}  所属视频
 * @param filePath        {String}    文件位置
 * @param creater         {ObjectId}  创建者
 * @param createdAt       {Date}      创建时间
 * @param updatedAt       {Date}      更新时间
 * @param sort            {Number}    排序值
 * @param deleted         {Boolean}   删除标记
 */

const episodeSchema = new Schema({
  name: { type: String },
  state: { type: Number, default: 0 },
  video: { type: ObjectId, ref: 'Video' },
  filePath: { type: String },
  creater: { type: ObjectId, ref: 'User' },
  sort: { type: Number, default: 0, index: true },
  deleted: { type: Boolean, default: false },
}, {
  timestamps: true,
});

episodeSchema.pre('save', function(next) {
  this.filePath = this.filePath.replace(/\\/g, '/');
  next();
})

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;
