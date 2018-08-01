/**
 * 简单示例
 */

var log4js = require('log4js');
log4js.configure({
    appenders: {
        'demo-app-trace': {
            // 直接写文件，适合日质量比较大的情况，日志文件超过某个数值就拆分新文件
            type: 'file',
            maxLogSize: 200, // bytes
            backups: 3, // 最多留几个
            filename: 'logs/demo-app-trace-log'
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
loggerTrace.trace('一些字符串-trace');
loggerError.error('一些字符串-error');

// 作为工具输出
export default {
    trace(str) {
        loggerTrace.trace(str);
    },
    error(str) {
        loggerError.error(str);
    }
};
