const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * @param title            {String}    标题
 * @param aka              {Array}     关键字
 * @param performers       {Array}     主演
 * @param countries        {Array}     国家
 * @param directors        {Array}     导演
 * @param posterPath       {String}    海报位置
 * @param summary          {String}    描述
 * @param collectCount     {String}    收藏次数
 * @param commentsCount    {String}    评论数
 * @param wishCount        {String}    期待值
 * @param year             {String}    年份
 * @param type             {ObjectId}  类型
 * @param deleted          {Boolean}   删除标记
 * @param creater          {ObjectId}  上传者
 * @param episodes         {Object}    剧集信息
 * @param createdAt        {Date}      创建时间
 * @param updatedAt        {Date}      更新时间
 * @param sort             {Number}    排序值
 */

const videoSchema = new Schema({
  title: { type: String },
  aka: [{ type: String }],
  performers: [{ type: String }],
  countries: [{ type: String }],
  directors:  [{ type: String }],
  posterPath: { type: String },
  summary: { type: String },
  collectCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  wishCount: { type: Number, default: 0 },
  year: { type: String },
  type: [{ type: ObjectId, ref: 'Type' }],
  deleted: { type: Boolean, default: false },
  creater: { type: ObjectId, ref: 'User' },
  sort: { type: Number, default: 0, index: true },
}, {
  timestamps: true,
});

videoSchema.pre('save', function(next) {
  this.posterPath = this.posterPath.replace(/\\/g, '/');
  next();
})

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
