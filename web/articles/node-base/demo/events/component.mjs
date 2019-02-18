/**
 * 事件入门示例
 */

import EventEmitter from 'events';

class MyEmitter extends EventEmitter {
  constructor() {
    super();
    setTimeout(() => {
      this.emit('eventName', 'params Value');
    }, 1000)
  }
};

const myEmitter = new MyEmitter();
myEmitter.on('eventName', (params) => {
  console.log('event params:', params);
});
