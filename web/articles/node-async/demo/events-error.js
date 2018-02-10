/**
 * events 模块入门示例
 */
const util = require('util');
const EventEmitter = require('events');

// 业务对象
const PersionClass = function () {};
util.inherits(PersionClass, EventEmitter);

const baby = new PersionClass();

baby.on('error', (err) => {
    console.log(err);
});
baby.on('event-name', function (a, b) {
    // 运算错误
    if (b === 0) {
        this.emit('error', '分母不能为零');
        return;
    }
    console.log(a/b);
});

baby.emit('event-name', 1, 0);
console.log('程序未被异常终止')