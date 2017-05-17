const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @param stuid            {Number}   学号
 * @param nickname         {String}   昵称
 * @param remark           {String}   备注
 * @param avatar           {String}   头像
 * @param sex              {Number}   性别
 * @param province         {String}   省份
 * @param city             {String}   城市
 * @param openid           {String}   openid
 * @param email            {String}   邮箱
 * @param score            {Number}   积分
 * @param level            {String}   等级
 * @param type             {Number}   类型
 * @param theme            {Object}   主题
 * @param deleted          {Boolean}  删除标记
 * @param lastLoginAt      {Date}     最近登录时间
 * @param createdAt        {Date}     注册时间
 * @param updatedAt        {Date}     更新时间
 */

const userSchema = new Schema({
  stuid: { type: Number, unique: true },
  nickname: { type: String },
  remark: { type: String },
  avatar: { type: String },
  sex: { type: Number },
  province: { type: String },
  city: { type: String },
  openid: { type: String },
  email: { type: String },
  score: { type: Number, default: 0 },
  level: { type: String },
  type: { type: Number, default: 0 },
  theme: { type: Object },
  deleted: { type: Boolean, default: false },
  lastLoginAt: { type: Date },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
