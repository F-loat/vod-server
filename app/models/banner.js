const ms = require('ms');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * @param title         {String}    标题
 * @param summary       {String}    描述
 * @param type          {String}    类型
 * @param href          {String}    链接
 * @param path          {String}    文件位置
 * @param creater       {ObjectId}  创建者
 * @param deadline      {Date}      截至时间
 * @param createdAt     {Date}      创建时间
 * @param updatedAt     {Date}      更新时间
 */

const bannerSchema = new Schema({
  title: { type: String },
  summary: { type: String },
  type: { type: String },
  href: { type: String },
  path: { type: String },
  creater: { type: ObjectId, ref: 'User' },
  deadline: { type: Date, default: Date.now() + ms('7d') },
}, {
  timestamps: true,
});

bannerSchema.pre('save', function replace(next) {
  const filePath = this.filePath;
  this.filePath = filePath && filePath.replace(/\\/g, '/');
  next();
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
