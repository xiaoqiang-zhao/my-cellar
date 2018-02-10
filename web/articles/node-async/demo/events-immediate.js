/**
 * events 异步事件示例
 */
const util = require('util');
const EventEmitter = require('events');

// 业务对象
const PersionClass = function () {};
util.inherits(PersionClass, EventEmitter);

const baby = new PersionClass();
baby.on('event-name', () => {
    console.log('a');
});
baby.on('event-name', () => {
    setImmediate(() => {
        console.log('c');
      });
});
baby.on('event-name', () => {
    console.log('b');
});

baby.emit('event-name');
// 输出：
// a
// b
// c