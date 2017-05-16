const config = require('config');
const Redis = require("ioredis");
const redis = new Redis(config.get('redis'));
const logger = require('../utils/logger')('Redis');

redis.on("error", err => logger.error(err));

module.exports = redis;
