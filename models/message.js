const mongoose  = require('mongoose');
const BaseModel = require("./base_model");
const Schema    = mongoose.Schema;
const ObjectId  = Schema.Types.ObjectId;

/**
 * @param subject      {ObjectId}  主题
 * @param master       {ObjectId}  所有者
 * @param author       {ObjectId}  发布者
 * @param deleted      {Boolean}   删除标记
 * @param hasRead      {Boolean}   已读标记
 * @param type         {String}    类型
 * @param createdAt    {Date}      创建时间
 * @param updatedAt    {Date}      更新时间
 * @param sort         {Number}    排序值
 */

const messageSchema = new Schema({
  subject: { type: ObjectId, index: true },
  master: { type: ObjectId, ref: 'User', index: true },
  author: { type: ObjectId, ref: 'User' },
  deleted: { type: Boolean, default: false },
  hasRead: { type: Boolean, default: false },
  type: { type: ObjectId, ref: 'Type' },
  sort: { type: Number, default: 0, index: true },
}, {
  timestamps: true,
});

messageSchema.index({master: 1, has_read: -1, create_time: -1});

mongoose.model('Message', MessageSchema);
