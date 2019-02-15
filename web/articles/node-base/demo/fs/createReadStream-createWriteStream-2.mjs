/**
 * @file 流式读写 Demo
 */

import fs from 'fs';

// 创建一个可读流（生产者）
const rs = fs.createReadStream('./rw-log', {
  encoding: 'utf-8'
});

// 创建一个可写流（消费者）
const ws = fs.createWriteStream('./rw-log2', {
  encoding: 'utf-8'
});

rs.on('data', chunk => {
  ws.write(chunk);
});

rs.on('end', () => {
  ws.end('');
});
