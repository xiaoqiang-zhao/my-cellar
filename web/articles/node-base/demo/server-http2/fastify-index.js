/**
 * @file 用 fastify 框架实现 https + http2
 */

'use strict'

const fs = require('fs')
const path = require('path')
const fastify = require('fastify')({
  http2: true,
  https: {
    key: fs.readFileSync('./ssl/privkey.pem'),
    cert: fs.readFileSync('./ssl/server.pem')
  }
})

fastify.get('/', function (request, reply) {
  reply
    .code(200)
    .type('text/html')
    .send(`
<!DOCTYPE html>
<html lang=en>
<head>
  <meta charset=utf-8>
  <meta http-equiv=X-UA-Compatible content="IE=edge">
  <meta name=viewport content="width=device-width,initial-scale=1">
  <title>Fastify Demo</title>
  <meta name=description content="Fast and low overhead web framework, for Node.js">
</head>
<body>
    Fastify Demo for https and http/2
</body>
</html>
`);
})

fastify.listen(3000)
