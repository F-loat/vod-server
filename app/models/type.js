const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * @param name          {String}     名称
 * @param type          {String}     分类
 * @param creater       {ObjectId}   创建者
 * @param createdAt     {Date}       创建时间
 * @param updatedAt     {Date}       更新时间
 */

const typeSchema = new Schema({
  name: { type: String },
  type: { type: String, index: true },
  creater: { type: ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

const Type = mongoose.model('Type', typeSchema);

module.exports = Type;
