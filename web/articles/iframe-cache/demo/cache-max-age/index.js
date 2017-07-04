/**
 * Created by zhaoxiaoqiang on 2017/3/7.
 */
const Koa = require('koa');
const app = new Koa();
var router = require('koa-router')();
var koaStatic = require('koa-static')('./');

// 定制请求头
app.use(async function (ctx, next) {
    ctx.set('Cache-Control', 'max-age=2000');
    await next();
});

app.use(router.routes());
app.use(koaStatic);

app.listen(4001);

console.log('服务已启动: localhost:4001');