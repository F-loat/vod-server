const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * @param name          {String}     名称
 * @param type          {String}     分类
 * @param creater       {ObjectId}   创建者
 * @param deleted       {Boolean}    删除标记
 * @param createdAt     {Date}       创建时间
 * @param updatedAt     {Date}       更新时间
 * @param sort          {Number}     排序值
 */

const typeSchema = new Schema({
  name: { type: String },
  type: { type: String, index: true },
  creater: { type: ObjectId, ref: 'User' },
  deleted: { type: Boolean, default: false },
  sort: { type: Number, default: 0, index: true },
}, {
  timestamps: true,
});

const Type = mongoose.model('Type', typeSchema);

module.exports = Type;
