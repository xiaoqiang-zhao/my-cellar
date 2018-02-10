/**
 * events 模块使用示例
 */
const util = require('util');
const EventEmitter = require('events');

const PersionClass = function () {
    this.attr = 'a';
};

util.inherits(PersionClass, EventEmitter);

const baby = new PersionClass();
// 用普通函数定义回调，this 指向当前对象
baby.on('event-name-common-function', function(a, b) {

    console.log(a, b, this);
    // Prints:
    // a b PersionClass {
    //     attr: 'a',
    //     _events: { 'event-name': [Function] },
    //     _eventsCount: 1 }
});

baby.on('event-name-arrow-function', (a, b) => {
    console.log(a, b, this);
    // Prints:
    // a b {}
});

const obj = {
    attr: 'b',
    bind() {
        baby.on('event-name-common-function-supper', function (a, b) {
            console.log(a, b, this);
            // Prints:
            // a b PersionClass {
            //   attr: 'a',
            //   _events: 
            //    { 'event-name-common-function': [Function],
            //      'event-name-arrow-function': [Function],
            //      'event-name-common-function-supper': [Function],
            //      'event-name-arrow-function-supper': [Function] },
            //   _eventsCount: 4 }
        });

        baby.on('event-name-arrow-function-supper', (a, b) => {
            console.log(a, b, this);
            // Prints:
            // a b { attr: 'b', bind: [Function: bind] }
        });
    }
}
obj.bind();

baby.emit('event-name-common-function', 'a', 'b');
baby.emit('event-name-arrow-function', 'a', 'b');
baby.emit('event-name-common-function-supper', 'a', 'b');
baby.emit('event-name-arrow-function-supper', 'a', 'b');
