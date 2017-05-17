const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * @param title         {String}    标题
 * @param content       {String}    内容
 * @param author        {ObjectId}  作者
 * @param replyCount    {Number}    评论数
 * @param visitCount    {Number}    浏览数
 * @param type          {ObjectId}  类型
 * @param top           {Boolean}   置顶标记
 * @param lock          {Boolean}   锁定标记
 * @param deleted       {Boolean}   删除标记
 * @param createdAt     {Date}      创建时间
 * @param updatedAt     {Date}      更新时间
 * @param sort          {Number}    排序值
 */

const topicSchema = new Schema({
  title: { type: String },
  content: { type: String },
  author: { type: ObjectId, ref: 'User' },
  replyCount: { type: Number, default: 0 },
  visitCount: { type: Number, default: 0 },
  type: { type: ObjectId, ref: 'Type' },
  top: { type: Boolean, default: false },
  lock: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  sort: { type: Number, default: 0, index: true },
}, {
  timestamps: true,
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
