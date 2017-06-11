const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const defaultDeadtime = 7 * 24 * 60 * 60 * 1000;

/**
 * @param title         {String}    标题
 * @param summary       {String}    描述
 * @param type          {String}    类型
 * @param href          {String}    链接
 * @param filePath      {String}    文件位置
 * @param deleted       {Array}     删除标记
 * @param creater       {ObjectId}  创建者
 * @param deadline      {Date}      截至时间
 * @param createdAt     {Date}      创建时间
 * @param updatedAt     {Date}      更新时间
 * @param sort          {Number}    排序值
 */

const bannerSchema = new Schema({
  title: { type: String },
  summary: { type: String },
  type: { type: Number },
  href: { type: String },
  filePath: { type: String },
  deleted: { type: Boolean, default: false },
  creater: { type: ObjectId, ref: 'User' },
  deadline: { type: Date, default: Date.now() + defaultDeadtime },
  sort: { type: Number, default: 0, index: true },
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
