const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient();

// 两秒后断开
setTimeout(() => {
    client.quit();
}, 2000);

client.on('ready', function () {
    console.log('Redis 连接成功：');
});

client.on('error', function (err) {
    console.log('Redis 连接失败：' + err);
});

// 插入数据
// client.set('foo', 'bar', redis.print);

// 获取数据
client.get('foo', (err, val) => {
    console.log('get value 1:', val);
});

client.getAsync('foo').then(val => {
    console.log('get value 2:', val);
});
