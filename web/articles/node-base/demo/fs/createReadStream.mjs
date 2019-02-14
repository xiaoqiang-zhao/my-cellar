/**
 * @file 流式读取 Demo
 */

import fs from 'fs';
// 创建一个可读流（生产者）
const rs = fs.createReadStream('./app-trace-log', {
    encoding: 'utf-8'
});
const spaceStr = '\n';
const counter = {
    count: 0,
    add(content) {
      content.length > 200 && this.count++;
    }
}
let count = 0;
let lineNum = 0;
let preChunkLinePart = '';

rs.on('data', chunk => {
  count++;
  let index = 0;
  // 需要将前一个流片段的半行拼接到当前流片段前
  chunk = preChunkLinePart + chunk;
  const lastIndex = chunk.lastIndexOf(spaceStr);
  while (index + 1 < lastIndex) {
    lineNum++;
    const endIndex = chunk.indexOf(spaceStr, index) + 1;
    // 打印每一行
    const content = chunk.slice(index, endIndex);
    console.log(count, lineNum, index, endIndex, content);
    index = endIndex;
    counter.add(content);
  }

  if (lastIndex < chunk.length) {
    // 将当前流片段剩余的半行保存进变量，方便下一个流调用
    preChunkLinePart = chunk.slice(lastIndex + 1, chunk.length);
  }
});
rs.on('end', () => {
  console.log('end', preChunkLinePart);
  // 当文档最后不是空行时，会漏统计最后一行，在 end 事件中补上这个逻辑漏洞
  if (preChunkLinePart) {
    console.log('--');
    counter.add(preChunkLinePart);
  }
  console.log('单行长度超 200 的行数总计：', counter.count);
});
