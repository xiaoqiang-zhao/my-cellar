/**
 * Created by zhaoxiaoqiang on 2017/3/7.
 */
const Koa = require('koa');
const app = new Koa();
var router = require('koa-router')();
var koaStatic = require('koa-static')('./');

// 定制请求头
app.use(async function (ctx, next) {
    // Cache-Control
    var s = 'max-age=2000';
    console.log('Cache-Control: ' + s);
    ctx.set('Cache-Control', s);

    // Transfer-Encoding
    console.log('Transfer-Encoding: chunked');
    // ctx.set('Transfer-Encoding', 'chunked');

    ctx.set('Connection', 'keep-alive');

    await next();
});

app.use(router.routes());
app.use(koaStatic);

app.listen(4001);

console.log('服务已启动: localhost:4001');