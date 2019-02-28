/**
 * @file 原生实现 https + http2
 */

const http2 = require('http2');
const fs = require('fs');

// SSL options
var httpsOptions = {
  key: fs.readFileSync('./ssl/privkey.pem'),
  cert: fs.readFileSync('./ssl/server.pem')
};

const server = http2.createSecureServer(httpsOptions, (request, response) => {
  const encoding = 'utf-8';

  response.writeHead(200, {
    'Content-Type': 'application/javascript; charset=utf-8;'
  });

  response.write('{"a": "a"}', encoding);
  response.end();
});

const port = 8443;
server.listen(port);
console.log('启动成功，127.0.0.1:', port);
