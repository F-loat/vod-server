const Router = require('koa-router');
const Filter = require('../controllers/filter');
const Video = require('../controllers/video');
const Episode = require('../controllers/episode');
const Danmaku = require('../controllers/danmaku');
const Banner = require('../controllers/banner');
const Comment = require('../controllers/comment');
const Topic = require('../controllers/topic');
const Type = require('../controllers/type');
const User = require('../controllers/user');
const upload = require('../utils/upload');
const router = new Router({
  prefix: '/request',
});

/**
 * @method GET 从服务器取出资源（一项或多项）
 * @method POST 在服务器新建一个资源
 * @method PUT 在服务器更新资源（客户端提供改变后的完整资源）
 * @method PATCH 在服务器更新资源（客户端提供改变的属性）
 * @method DELETE 从服务器删除资源
 */

router
  .get('/video', Video.detail)
  .post('/video', Filter.admin, upload.single('poster'), Video.add)
  .put('/video', Filter.admin, upload.single('poster'), Video.update)
  .delete('/video', Filter.admin, Video.delete);
router
  .get('/video/list', Video.list);
router
  .get('/video/typed', Video.typed);

router
  .get('/episode', Episode.detail)
  .post('/episode', Filter.admin, upload.single('episode'), Episode.add);
router
  .get('/episode/list', Episode.list)
router
  .post('/episode/transcoding', Filter.admin, Episode.transcode);

router
  .get('/danmaku', Danmaku.detail)
  .post('/danmaku', Danmaku.add);
router
  .get('/danmaku/list', Danmaku.list);

router
  .get('/banner', Banner.detail)
  .post('/banner', Filter.admin, Banner.add)
  .put('/banner', Filter.admin, Banner.update)
  .delete('/banner', Filter.admin, Banner.delete);
router
  .get('/banner/list', Banner.list);

router
  .get('/comment', Comment.detail)
  .post('/comment', Filter.login, Comment.add)
  .put('/comment', Filter.admin, Comment.update)
  .delete('/comment', Filter.admin, Comment.delete);
router
  .get('/comment/list', Comment.list);

router
  .get('/topic', Topic.detail)
  .post('/topic', Filter.login, Topic.add)
  .put('/topic', Filter.admin, Topic.update)
  .delete('/topic', Filter.admin, Topic.delete);
router
  .get('/topic/list', Topic.list)

router
  .get('/type', Type.detail)
  .post('/type', Filter.admin, Type.add)
  .put('/type', Filter.admin, Type.update)
  .delete('/type', Filter.admin, Type.delete);
router
  .get('/type/list', Type.list)

router
  .get('/user', Filter.login, User.detail)
  .put('/user', Filter.admin, User.update)
  .delete('/user', Filter.admin, User.delete);
router
  .get('/user/list', Filter.admin, User.list);
router
  .post('/user/login', User.login);
router
  .get('/user/logout', Filter.login, User.logout);

module.exports = router;
