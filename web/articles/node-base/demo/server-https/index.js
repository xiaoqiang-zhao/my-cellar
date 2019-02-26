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
  ctx.body = "hello world, from xiaoqiang-zhao. " + ctx.request.url;
});
 
// SSL options
var options = {
  key: fs.readFileSync('./ssl/privkey.pem'),
  cert: fs.readFileSync('./ssl/server.pem')
}
 
// start the server
http.createServer(app.callback()).listen(8080);
https.createServer(options, app.callback()).listen(8081);

