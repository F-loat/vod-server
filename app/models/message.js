const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * @param belong       {ObjectId}  主题
 * @param master       {ObjectId}  所有者
 * @param author       {ObjectId}  发布者
 * @param read         {Boolean}   已读标记
 * @param type         {String}    类型
 * @param createdAt    {Date}      创建时间
 * @param updatedAt    {Date}      更新时间
 */

const messageSchema = new Schema({
  belong: { type: ObjectId, index: true },
  master: { type: ObjectId, ref: 'User', index: true },
  author: { type: ObjectId, ref: 'User' },
  read: { type: Boolean, default: false },
  type: { type: ObjectId, ref: 'Type' },
}, {
  timestamps: true,
});

messageSchema.index({ master: 1, has_read: -1, create_time: -1 });

mongoose.model('Message', messageSchema);
