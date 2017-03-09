/**
 * Created by zhaoxiaoqiang on 2017/3/7.
 */
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const koaStatic = require('koa-static')('./');
const koaProxy = require('koa-proxy')({
    host: 'http://127.0.0.1:5000'
});

// router.get('/a-get', function *(next) {
//     this.body = '来端口 4000 *非*自代理的 Hello World A!';
// });

app.use(router.routes());
app.use(koaStatic);

app.use(koaProxy);

app.listen(4000);

console.log('服务已启动: localhost:4000');