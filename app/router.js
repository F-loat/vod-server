const Router = require('koa-router');
const middlewares = require('./middlewares');
const controllers = require('./controllers');
const { upload } = require('./utils/upload');

const { Filter } = middlewares;
const {
  Banner,
  Comment,
  Danmaku,
  Episode,
  File,
  Log,
  Token,
  Topic,
  Type,
  User,
  Video,
} = controllers;

const router = new Router({
  prefix: '/request',
});

/**
 * @method GET 从服务器取出资源（一项或多项）
 *  - /resources Controller.index
 *  - /resources/:id Controller.show
 * @method POST 在服务器新建一个资源
 *  - /resources Controller.create
 * @method PUT 在服务器更新资源（客户端提供改变后的完整资源）
 *  - /resources/:id Controller.update
 * @method PATCH 在服务器更新资源（客户端提供改变的属性）
 *  - /resources/:id Controller.edit
 * @method DELETE 从服务器删除资源
 *  - /resources/:id Controller.destroy
 */


router.get('/videos', Video.index);
router.get('/videos/:id', Video.show);
router.post('/videos', Filter.admin, Video.create);
router.put('/videos/:id', Filter.admin, Video.update);
router.delete('/videos/:id', Filter.admin, Video.destroy);

router.get('/episodes', Episode.index);
router.get('/episodes/:id', Episode.show);
router.post('/episodes', Filter.admin, Episode.create);
router.get('/episodes/:id/transcode', Filter.admin, Episode.transcode);
router.delete('/episodes/:id', Filter.admin, Episode.destroy);

router.get('/danmakus', Danmaku.index);
router.get('/danmakus/:id', Danmaku.show);
router.post('/danmakus', Filter.login, Danmaku.create);

router.get('/banners', Banner.index);
router.post('/banners', Filter.admin, Banner.create);
router.put('/banners/:id', Filter.admin, Banner.update);
router.delete('/banners/:id', Filter.admin, Banner.destroy);

router.get('/comments', Comment.index);
router.get('/comments/:id', Comment.show);
router.post('/comments', Filter.login, Comment.create);
router.put('/comments/:id', Filter.admin, Comment.update);
router.delete('/comments/:id', Filter.admin, Comment.destroy);

router.get('/topics', Topic.index);
router.get('/topics/:id', Topic.show);
router.post('/topics', Filter.login, Topic.create);
router.put('/topics/:id', Filter.admin, Topic.update);
router.delete('/topics/:id', Filter.admin, Topic.destroy);

router.get('/types', Type.index);
router.get('/types/:id', Type.show);
router.post('/types', Filter.admin, Type.create);
router.put('/types/:id', Filter.admin, Type.update);
router.delete('/types/:id', Filter.admin, Type.destroy);

router.get('/users', Filter.admin, User.index);
router.get('/users/:id', Filter.login, User.show);
router.post('/users', User.create);
router.put('/users/:id', Filter.admin, User.update);
router.delete('/users/:id', Filter.admin, User.destroy);

router.post('/tokens', Token.create);
router.delete('/tokens/:id', Filter.login, Token.destroy);

router.post('/files', Filter.admin, upload.single('file'), File.create);
router.get('/logs', Filter.admin, Log.index);

module.exports = router;
