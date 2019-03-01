const https = require('https');
const fs = require('fs');
 
// SSL options
var options = {
  key: fs.readFileSync('./ssl/privkey.pem'),
  cert: fs.readFileSync('./ssl/server.pem')
}
 
const port = 8081;
https.createServer(options, (request, response) => {
  const encoding = 'utf-8';

  response.writeHead(200, {
    'Content-Type': 'application/javascript; charset=utf-8;'
  });

  response.write('{"a": "a"}', encoding);
  response.end();
}).listen(port);

console.log('启动成功，127.0.0.1:', port);
