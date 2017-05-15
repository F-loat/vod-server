const express = require('express');
const router = express.Router();
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

/**
 * @method GET 从服务器取出资源（一项或多项）
 * @method POST 在服务器新建一个资源
 * @method PUT 在服务器更新资源（客户端提供改变后的完整资源）
 * @method PATCH 在服务器更新资源（客户端提供改变的属性）
 * @method DELETE 从服务器删除资源
 */

router.route('/video')
  .get(Video.detail)
  .post(Filter.admin, upload.single('poster'), Video.add)
  .put(Filter.admin, upload.single('poster'), Video.update)
  .delete(Filter.admin, Video.delete);
router.route('/video/list')
  .get(Video.list);
router.route('/video/typed')
  .get(Video.typed);
router.route('/episode')
  .get(Episode.detail)
  .post(Filter.admin, upload.single('episode'), Episode.add);
router.route('/episode/list')
  .get(Episode.list)
router.route('/episode/transcoding')
  .post(Filter.admin, Episode.transcode);
router.route('/danmaku')
  .get(Danmaku.detail)
  .post(Danmaku.add);
router.route('/danmaku/list')
  .get(Danmaku.list);

router.route('/banner')
  .get(Banner.detail)
  .post(Filter.admin, Banner.add)
  .put(Filter.admin, Banner.update)
  .delete(Filter.admin, Banner.delete);
router.route('/banner/list')
  .get(Banner.list);

router.route('/comment')
  .get(Comment.detail)
  .post(Filter.login, Comment.add)
  .put(Filter.admin, Comment.update)
  .delete(Filter.admin, Comment.delete);
router.route('/comment/list')
  .get(Comment.list);

router.route('/topic')
  .get(Topic.detail)
  .post(Filter.login, Topic.add)
  .put(Filter.admin, Topic.update)
  .delete(Filter.admin, Topic.delete);
router.route('/topic/list')
  .get(Topic.list)

router.route('/type')
  .get(Type.detail)
  .post(Filter.admin, Type.add)
  .put(Filter.admin, Type.update)
  .delete(Filter.admin, Type.delete);
router.route('/type/list')
  .get(Type.list)

router.route('/user')
  .get(Filter.login, User.detail)
  .put(Filter.admin, User.update)
  .delete(Filter.admin, User.delete);
router.route('/user/login')
  .post(User.login);
router.route('/user/logout')
  .get(Filter.login, User.logout);
router.route('/user/list')
  .get(Filter.admin, User.list);

module.exports = router;
