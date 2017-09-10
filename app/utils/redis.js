const config = require('config');
const Redis = require('ioredis');

const redis = new Redis(config.get('redis'));

redis.on('error', err => console.error(err));

module.exports = redis;
