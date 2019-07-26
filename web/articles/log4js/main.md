# Log4js 使用备忘

> 记录日志方便问题排查，可以查看系统运行中发生了什么。

## 概述

Log4 是由 Apache 提供的多语言日志书写扩展包，目的是使日志书写更加方便简洁，同时对不同的业务日志能够进行灵活的分文件记录，同时也包含着详细的等级配置，为之后分级输出、检索、及程序自动解析提供更加便捷的支持。Log4 多语言有 Log4cpp，Log4j，Log4net 等，看名字就知道对应是那种语言。

## 级别

Log4js 原生提供了 4 中级别的错误类型，可以自动将不同类型和级别的错误打进不同的文件中。

- trace，踪迹
- debug，调试
- info，信息
- warn，警告
- error，错误
- fatal，严重问题

使用示例:
```js
logger.trace('Entering cheese testing'); 
```

## 日志拆分规则

经年累月的日志文件可能很大，大文件处理起来会有一些困难，一般日志写入时会分文件写入。分文件的常用规则有两种，一种是规定日志文件大小，满了就新建一个文件再写入；另一种是按日期和时间，比如每天或每小时一个日志文件。配置如下:

```js
// 安日志大小拆分
{
    type: 'file',
    maxLogSize: 1024*1024, // bytes
    backups: 300, // 最多留几个
}
// 按日期拆分
{
    type: 'dateFile',
    pattern: '.yyyy-MM-dd'
}
```

## 和 pm2 搭配

```shell
pm2 install pm2-intercom
```

配置

```js
log4js.configure({
  appenders: { out: { type: 'stdout'}},
  categories: { default: { appenders: ['out'], level: 'info'}},
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID'
});
```

## 生产示例

```js
const log4js = require('log4js');
log4js.configure({
    appenders: {
        'demo-app-trace': {
            // 直接写文件，适合日质量比较大的情况，日志文件超过某个数值就拆分新文件
            type: 'file',
            maxLogSize: 200, // bytes
            backups: 3, // 最多留几个
            filename: __dirname + '/logs/demo-app-trace-log'
            // 当前存储在 demo-app-trace-log 文件中，
            // 当文件大小超出限制时将原来的文件数字依次递增，如果文件总数超过设置那么移除文件号最大的文件 
            // 然后 demo-app-trace-log 命名为 demo-app-trace-log.1
            // 最后建文件 demo-app-trace-log 继续记录
        },
        'demo-app-error': {
            // 日期拆分日志，适合量较小的日志，比如日小与 100M
            type: 'dateFile',
            pattern: '.yyyy-MM-dd', // 为了看效果方便可以按分钟 -hh-mm
            filename: 'logs/demo-app-error-log'
            // 当前存储在 demo-app-error-log 文件中，
            // 新的日期来临时将 demo-app-error-log 文件加时间重命名，然后新建 demo-app-error-log 文件
        }
    },
    categories: {
        default: {
            appenders: ['demo-app-trace'],
            level: 'trace'
        },
        error: {
            appenders: ['demo-app-error'],
            level: 'error'
        }
    }
});

const loggerTrace = log4js.getLogger();
const loggerError = log4js.getLogger('error');

// 为了方便直接演示
// loggerTrace.trace('一些字符串-trace');
// loggerError.error('一些字符串-error');

// 作为工具输出
export default {
    trace(str) {
        loggerTrace.trace(str);
    },
    error(str) {
        loggerError.error(str);
    }
};
```

## 日志分析

简单的用 shell 脚本分析:

```shell
# 读取 false 的前 2 后 1 行
cat log | grep false -B 2 -A 1
# 统计 false 一共出现了多少次(一行中出现多次就记录多次)
cat log | grep -c false
# 在多个文件中查找
cat log log.1 | grep false
# 正则匹配
# 如果我们有如下日志:
# [2019-07-23T12:34:37.215] [TRACE] default - request, URL:/download/b1744.zip, method:GET
# [2019-07-23T12:44:40.005] [TRACE] default - request, URL:/projects/, method:GET
# [2019-07-23T12:44:40.005] [TRACE] default - request, URL:/projects/3cfd5498-26b/zip-name, method:GET
# 我们想统计 restful 路由为 /projects/:id/zip-name 的请求出现的次数，可用下面命令
cat trace-log | egrep "\/projects\/[^\/]+\/zip-name" -c
```

除了 shell 脚本，你还有 nodejs 可供选择，用 readline 包写个 cli 工具可以做一些更复杂的事情。

最后，日志规范化与分析监控是一个漫长但是有意义的过程，规范化是分析监控的基础，一团乱麻是理不清的。这需要持续的耐心和推动，但是付出总归会有回报的，看着干净的日志输出、能比用户先发现问题，便是满满的愉悦感。

## 参考

[官网](https://log4js-node.github.io/log4js-node/)

[Node.js 之 log4js 完全讲解 -- 寸志](https://zhuanlan.zhihu.com/p/22110802)

[Nodejs进阶：readline实现日志分析+简易命令行工具](https://imweb.io/topic/5963a26ee5017dd2121d2c1f)

[大搜车 NodeJS 日志规范化与分析监控](https://juejin.im/entry/5790dbd55bbb500063b90f28)
