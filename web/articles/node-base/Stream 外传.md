# 流式读写外传

## 概述

如果文件较大就要考虑流式读写，读的速度一般比写的快还要控制“写任务”堆积造成内存爆满。NodeJs 中关于流的操作被封装到了 Stream 模块中，这个模块也被多个核心模块所引用，另外所有的 Stream(流)都是 EventEmitter 的实例。

可读流的两种模式：flowing 和 paused

- 在 flowing 模式下，可读流自动从系统底层读取数据，并通过 EventEmitter 接口的事件尽快将数据提供给应用，暖气模型。
- 在 paused 模式下，必须显式调用 stream.read()方法来从流中读取数据片段，水龙头模型。

所有初始工作模式为 paused 的 Readable 流，可以通过下面三种途径切换为 flowing 模式：

- 监听 data 事件。
- 调用 stream.resume() 方法。
- 调用 stream.pipe() 方法将数据发送到 Writable。

创建流式读取对象：

```js
fs.createWriteStream(path, [options]);
```

options 对象字段说明

- flags 打开文件的操作, 默认为'r'
- mode 权限位 0o666
- encoding 默认为 null
- start 开始读取的索引位置
- end 结束读取的索引位置(包括结束位置)
- highWaterMark 读取缓存区默认的大小64kb

## 流式读取

下面是一个流式读取示例：

```js
import fs from 'fs';
// 创建一个可读流（生产者）
let rs = fs.createReadStream('./app-trace-log');
let count = 0;
rs.on('data', chunk => {
  console.log(count++, chunk);
});
rs.on('end', () => {
  console.log('end');
});
```

默认情况下 chunk 是 16 进制数据流，如果你需要对内容进行处理需要指定编码。还要做好两段数据流的衔接，比如我们要统计一个日志文件中长度超过 200 的行数，但是两段数据流中很有可能前面一段结尾和后面一段开头的部分内容构成完整一行。

```js
import fs from 'fs';
// 创建一个可读流（生产者）
const rs = fs.createReadStream('./app-log', {
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
    index = endIndex;
    counter.add(content);
  }

  if (lastIndex < chunk.length) {
    // 将当前流片段剩余的半行保存进变量，方便下一个流调用
    preChunkLinePart = chunk.slice(lastIndex + 1, chunk.length);
  }
});

rs.on('end', () => {
  // 当文档最后不是空行时，会漏统计最后一行，在 end 事件中补上这个逻辑漏洞
  if (preChunkLinePart) {
    console.log('--');
    counter.add(preChunkLinePart);
  }
  console.log('单行长度超 200 的行数总计：', counter.count);
});
```

## 流式写入

如果是百兆以下的小文件，直接采用流式读写嵌套的形式就可以在几秒内完成，消耗的内存在峰值是也不超过 50M。

```js
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
```

如果是 1G 以上的大文件，由于写入速度跟不上读取速度，内存使用量会暴增，有可能导致数据丢失。正常的情况应该是，写完一段再读取下一段，如果没有写完的话，就让读取流先暂停，等写完再继续。

## 几个工具函数

打印内存占用情况
```js
function printMemoryUsage () {
  var info = process.memoryUsage();
  function mb (v) {
    return (v / 1024 / 1024).toFixed(2) + 'MB';
  }
  console.log('rss=%s, heapTotal=%s, heapUsed=%s', mb(info.rss), mb(info.heapTotal), mb(info.heapUsed));
}
```

## 参考

(NodeJs中的stream（流）- 基础篇
)[https://juejin.im/post/5a75d037f265da4e9e303773]
