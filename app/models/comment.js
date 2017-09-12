const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * @param belong         {ObjectId}   归属
 * @param content        {String}     内容
 * @param creater        {ObjectId}   评论人
 * @param createdAt      {Date}       创建时间
 * @param updatedAt      {Date}       更新时间
 */

const commentSchema = new Schema({
  belong: { type: ObjectId, index: true },
  content: { type: String },
  creater: { type: ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
