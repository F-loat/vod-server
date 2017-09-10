const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @param username         {String}   用户名
 * @param password         {String}   密码
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
 * @param lastLoginAt      {Date}     最近登录时间
 * @param createdAt        {Date}     注册时间
 * @param updatedAt        {Date}     更新时间
 */

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
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
  insider: { type: Boolean, default: true },
  type: { type: String, default: 'normal' },
  lastLoginAt: { type: Date },
}, {
  timestamps: true,
});

userSchema.pre('save', function replace(next) {
  const avatar = this.avatar;
  this.avatar = avatar && avatar.replace(/\\/g, '/');
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
