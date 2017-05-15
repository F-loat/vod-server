const token = require('../utils/token');

exports.login = async function (req, res, next) {
  const user = await token.verify(req, res);
  if (user) {
    req.user = user;
    next();
  }
};

exports.admin = async function (req, res, next) {
  const user = await token.verify(req, res);
  if (user && user.type > 9) {
    req.user = user;
    next();
    return;
  }
  res.json({ "state": 0, msg: '管理员可用！' });
};
