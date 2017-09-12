const fs = require('fs');
const path = require('path');
const config = require('config');
const models = require('../models');

const uploadPath = config.get('uploadPath');

/**
 * @param type   {String}  查询类型
 * @param limit  {String}  查询条数
 * @param page   {String}  查询页数
 */
exports.index = async (ctx) => {
  const {
    type,
    search,
    sort = '-createdAt',
    page = 1,
    limit = 10 } = ctx.query;
  const query = {};
  if (type) query.type = type;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: '$i' } },
      { aka: { $regex: search, $options: '$i' } },
    ];
  }

  const [videos, total] = await Promise.all([
    models.Video
      .find(query)
      .sort(sort)
      .populate('creater', 'nickname')
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(Number(limit)),
    models.Video.count(query),
  ]);

  ctx.body = { videos, total };
};

exports.show = async (ctx) => {
  const video = await models.Video.findById(ctx.params.id);
  if (!video) {
    ctx.status = 404;
    return;
  }
  video.visit += 1;
  video.save();
  ctx.body = video;
};

/**
 * @param title       {String}  标题
 * @param aka         {Array}   关键字
 * @param performers  {Array}   主演
 * @param countries   {Array}   国家
 * @param directors   {Array}   导演
 * @param poster      {String}  海报
 * @param summary     {String}  描述
 * @param year        {String}  年份
 * @param filePath    {String}  文件位置
 * @param episodes    {String}  剧集信息
 * @param type        {String}  类型
 * @param uploaders   {Array}   上传者
 */

exports.create = async (ctx) => {
  const { body } = ctx.request;

  const video = await models.Video.create({
    title: body.title,
    aka: body.aka,
    performers: body.performers,
    countries: body.countries,
    directors: body.directors,
    poster: body.poster,
    summary: body.summary,
    year: body.year,
    type: body.type,
    creater: ctx.user._id,
  });

  ctx.body = video;
};

exports.update = async (ctx) => {
  const { body } = ctx.request;
  await models.Video.update({ _id: ctx.params.id }, {
    title: body.title,
    aka: body.aka,
    performers: body.performers,
    countries: body.countries,
    directors: body.directors,
    summary: body.summary,
    poster: body.poster,
    year: body.year,
    type: body.type,
    $addToSet: {
      creater: ctx.user._id,
    },
  });
  ctx.status = 200;
};

exports.destroy = async (ctx) => {
  const video = await models.Video.findByIdAndRemove(ctx.params.id);

  if (!video) {
    ctx.status = 400;
    ctx.body = '该视频不存在';
    return;
  }
  const { poster } = video;
  if (poster) {
    fs.unlinkSync(path.join(uploadPath, poster));
  }
  const episodes = await models.Episode.find({ belong: video._id });
  episodes.forEach((episode) => {
    if (episode.path) fs.unlinkSync(path.join(uploadPath, episode.path));
    episode.remove();
  });

  ctx.status = 200;
  console.info(`视频 ${video.title} 被管理员${ctx.user.username}删除`);
};
