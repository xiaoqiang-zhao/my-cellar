/**
 * Created by zhaoxiaoqiang on 2017/3/7.
 */
const Koa = require('koa');
const app = new Koa();
var router = require('koa-router')();
var koaStatic = require('koa-static')('./');

app.use(router.routes());
app.use(koaStatic);

app.listen(4000);

console.log('服务已启动: localhost:4000');