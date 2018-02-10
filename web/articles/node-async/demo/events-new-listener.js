/**
 * events newListener示例
 */
const util = require('util');
const EventEmitter = require('events');

// 业务对象
const PersionClass = function () {};
util.inherits(PersionClass, EventEmitter);

const baby = new PersionClass();
baby.on('newListener', (eventName, listener) => {
    console.log(eventName, typeof listener);
});

baby.on('event-name-on', () => {
    // ...
});

baby.on('event-name-once', () => {
    // ...
});