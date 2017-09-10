const ms = require('ms');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * @param type          {String}    文件类别
 * @param path          {String}    文件位置
 * @param creater       {ObjectId}  创建者
 * @param createdAt     {Date}      创建时间
 * @param updatedAt     {Date}      更新时间
 */

const fileSchema = new Schema({
  type: { type: String },
  path: { type: String },
  creater: { type: ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
