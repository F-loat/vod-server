const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * @param subject        {ObjectId}   主题
 * @param content        {String}     内容
 * @param commenter      {ObjectId}   评论人
 * @param reply          {ObjectId}   回复对象
 * @param deleted        {Boolean}    删除标记
 * @param createdAt      {Date}       创建时间
 * @param updatedAt      {Date}       更新时间
 */

const commentSchema = new Schema({
  subject: { type: ObjectId, index: true },
  content: { type: String },
  commenter: { type: ObjectId, ref: 'User' },
  reply: { type: ObjectId, ref: 'User' },
  deleted: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
