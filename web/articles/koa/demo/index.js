/**
 * Created by zhaoxiaoqiang on 2017/3/7.
 */
const Koa = require('koa');
const app = new Koa();
var router = require('koa-router')();

router.get('/', function *(next) {
    this.body = 'Hello World!';
});

router.get('/a', function *(next) {
    this.body = 'Hello World A!';
});

app.use(router.routes());
app.listen(4000);

console.log('服务已启动: localhost:4000');