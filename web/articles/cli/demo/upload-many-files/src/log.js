/**
 * 日志模块
 */

const log4js = require('log4js');

log4js.configure({
    appenders: {
        'demo-app-trace': {
            // 直接写文件，适合日质量比较大的情况，日志文件超过某个数值就拆分新文件
            type: 'file',
            maxLogSize: 20000, // bytes
            backups: 10, // 最多留几个
            filename: __dirname + '/../logs/log'
            // 当前存储在 demo-app-trace-log 文件中，
            // 当文件大小超出限制时将原来的文件数字依次递增，如果文件总数超过设置那么移除文件号最大的文件 
            // 然后 demo-app-trace-log 命名为 demo-app-trace-log.1
            // 最后建文件 demo-app-trace-log 继续记录
        }
    },
    categories: {
        default: {
            appenders: ['demo-app-trace'],
            level: 'trace'
        }
    }
});

const loggerTrace = log4js.getLogger();

module.exports = {
    trace(str) {
        loggerTrace.trace(str);
    }
};
