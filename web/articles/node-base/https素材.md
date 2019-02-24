# https 素材

## 免费SSL服务有以下选择

Let's Encrypt

网页常挂。

StartCOM

导致被墙。

WoSign

运营商没底线。

## 购买淘宝COMODO证书

[https://item.taobao.com/item....](https://item.taobao.com/item.htm?id=15823207240&toSite=main#detail)

这家店6.98元购买一个单域名证书，关键客服还尽职尽责一路指导，极大节约开发者的时间成本，可靠性远超不稳定的免费证书，推荐。

## 生成测试证书

https://segmentfault.com/a/1190000007990972

Common Name 项必填，值: www.xiaoqiang-zhao.com

## 某官方文档

https://www.npmjs.com/package/koa-sslify

```js
const Koa = require('koa');
const http = require('http');
const https = require('https');
const fs = require('fs');
const { default: enforceHttps } = require('koa-sslify');
 
const app = new Koa();
 
// Force HTTPS using default resolver
app.use(enforceHttps({
  port: 8081
}));
 
// index page
app.use(ctx => {
  ctx.body = "hello world from " + ctx.request.url;
});
 
// SSL options
var options = {
  key: fs.readFileSync('./ssl/privkey.pem'),
  cert: fs.readFileSync('./ssl/server.pem')
}
 
// start the server
http.createServer(app.callback()).listen(8080);
https.createServer(options, app.callback()).listen(8081);
```

用上面的生成测试证书是可以的，访问 http 网站会自动重定向到 https。
