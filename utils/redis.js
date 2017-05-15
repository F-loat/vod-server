const config = require('config');
const Redis = require("ioredis");
const redis = new Redis(config.get('redis'));

redis.on("error", function (err) {
  console.error('Redis Error ' + err);
});

module.exports = redis;
