const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * @param title            {String}    标题
 * @param aka              {Array}     关键字
 * @param performers       {Array}     主演
 * @param countries        {Array}     国家
 * @param directors        {Array}     导演
 * @param poster           {String}    海报位置
 * @param summary          {String}    描述
 * @param year             {String}    年份
 * @param type             {ObjectId}  类型
 * @param reply            {Number}    评论数
 * @param visit            {Number}    浏览数
 * @param creater          {ObjectId}  上传者
 * @param episodes         {Object}    剧集信息
 * @param createdAt        {Date}      创建时间
 * @param updatedAt        {Date}      更新时间
 * @param random           {Number}    随机值
 */

const videoSchema = new Schema({
  title: { type: String },
  aka: [{ type: String }],
  performers: [{ type: String }],
  countries: [{ type: String }],
  directors: [{ type: String }],
  poster: { type: String },
  summary: { type: String },
  year: { type: String },
  type: [{ type: ObjectId, ref: 'Type' }],
  reply: { type: Number, default: 0 },
  visit: { type: Number, default: 0 },
  creater: [{ type: ObjectId, ref: 'User' }],
  random: { type: Number, default: Math.random, index: true },
}, {
  timestamps: true,
});

videoSchema.pre('save', function replace(next) {
  const posterPath = this.posterPath;
  this.posterPath = posterPath && posterPath.replace(/\\/g, '/');
  next();
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
