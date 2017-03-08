/**
 * Created by zhaoxiaoqiang on 2017/3/7.
 */
const Koa = require('koa');
const app = new Koa();
var router = require('koa-router')();

// 定制请求头
app.use(async function (ctx, next) {
    const start = new Date();
    console.log('step 1');
    await next();
    console.log('step 5');
    const ms = new Date() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// 日志输出
app.use(async function (ctx, next) {
    const start = new Date();
    console.log('step 2');
    await next();
    const ms = new Date() - start;
    console.log('step 4:' + `${ctx.method} ${ctx.url} - ${ms}`);
});

// 请求内容
app.use(ctx => {
    console.log('step 3');
    ctx.body = 'Hello World';
});

app.listen(4000);

console.log('服务已启动: localhost:4000');