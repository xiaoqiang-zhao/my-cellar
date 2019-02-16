/**
 * @file 流式读写 Demo，针对 1G 以上大文件
 */

import fs from 'fs';

// 记录时间
const start = new Date().getTime();

// 创建一个可读流（生产者）
const rs = fs.createReadStream('./rw-log1', {
  encoding: 'utf-8'
});

const ws = fs.createWriteStream('./rw-log2', {
  encoding: 'utf-8'
});

printMemoryUsage();

rs.on('data', chunk => {
  // 如果没有写完，暂停读取流
  // if (ws.write(chunk) === false) {
  //   rs.pause();
  // }
  ws.write(chunk, () => {
    rs.resume();
    // console.log('开始');
  });
  rs.pause();
  // console.log('数据流--');
});

rs.on('end', () => {
  ws.end('完成');
  console.log('--3--', new Date().getTime() - start);
  // const start = new Date().getTime();
});

// 缓冲区清空触发drain事件 这时再继续读取
// ws.on('drain', function() {
  // setTimeout(() => {
  // }, 20);
  // rs.resume();
  // console.log('???');
// });

ws.on('close', () => {
  console.log('------------ close -----------', new Date().getTime() - start);
});

function printMemoryUsage () {
  var info = process.memoryUsage();
  function mb (v) {
    return (v / 1024 / 1024).toFixed(2) + 'MB';
  }
  console.log('rss=%s, heapTotal=%s, heapUsed=%s', mb(info.rss), mb(info.heapTotal), mb(info.heapUsed));
}
// rss, 驻留集大小, 是给这个进程分配了多少物理内存
// heapTotal 和 heapUsed 代表V8的内存使用情况

// 100 毫秒记录一次内存
setInterval(printMemoryUsage, 1000);
