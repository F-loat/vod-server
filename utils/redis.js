const config = require('config');
const Redis = require('ioredis');
const logger = require('log4js').getLogger('Redis');

const redis = new Redis(config.get('redis'));

redis.on('error', err => logger.error(err));

module.exports = redis;
