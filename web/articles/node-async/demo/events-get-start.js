/**
 * events 模块入门示例
 */
const util = require('util');
const EventEmitter = require('events');

// 业务对象
const PersionClass = function () {};
util.inherits(PersionClass, EventEmitter);

const baby = new PersionClass();
baby.on('event-name', (a, b) => {
    console.log(a, b);
    // Prints:
    // a b
});

baby.emit('event-name', 'a', 'b');
