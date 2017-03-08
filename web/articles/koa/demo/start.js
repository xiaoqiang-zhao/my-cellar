/**
 * Created by zhaoxiaoqiang on 2017/3/7.
 */
const Koa = require('koa');
const app = new Koa();

// 请求内容
app.use(ctx => {
    console.log('step 3');
    ctx.body = 'Hello World';
});

app.listen(4000);

console.log('服务已启动: localhost:4000');