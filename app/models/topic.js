const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * @param title         {String}    标题
 * @param content       {String}    内容
 * @param reply         {Number}    评论数
 * @param visit         {Number}    浏览数
 * @param type          {ObjectId}  类型
 * @param top           {Boolean}   置顶标记
 * @param lock          {Boolean}   锁定标记
 * @param creater       {ObjectId}  作者
 * @param createdAt     {Date}      创建时间
 * @param updatedAt     {Date}      更新时间
 */

const topicSchema = new Schema({
  title: { type: String },
  content: { type: String },
  reply: { type: Number, default: 0 },
  visit: { type: Number, default: 0 },
  type: { type: ObjectId, ref: 'Type' },
  top: { type: Boolean, default: false },
  lock: { type: Boolean, default: false },
  creater: { type: ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
