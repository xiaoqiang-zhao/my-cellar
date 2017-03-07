/**
 * Created by zhaoxiaoqiang on 2017/3/7.
 */
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
    ctx.body = 'Hello World';
});

app.listen(4000);

console.log('服务已启动: localhost:4000');