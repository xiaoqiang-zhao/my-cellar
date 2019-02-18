/**
 * 事件入门示例
 */

import EventEmitter from 'events';
class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();
myEmitter.on('eventName', () => {
  console.log('an event occurred!');
});

myEmitter.emit('eventName');
