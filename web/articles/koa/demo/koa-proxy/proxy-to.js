/**
 * Created by zhaoxiaoqiang on 2017/3/7.
 */
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

router.get('/a-get', function *(next) {
    this.body = '来端口 5000 自代理的 Hello World A, method: GET!';
});

router.post('/b-post', function *(next) {
    this.body = '来端口 5000 自代理的 Hello World B, method: POST!';
});

app.use(router.routes());
app.listen(5000);

console.log('服务已启动: localhost:5000');