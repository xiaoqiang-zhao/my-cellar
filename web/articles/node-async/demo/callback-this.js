/**
 * 回调函数 this 指向示例
 */

const value = 'a';

function fn(option) {
    option.fn();
    option.ob.fn();

    const fn = option.ob.fn;
    fn();
}

fn({
    attr: 'a',
    fn() {
        console.log(this.attr);
        // a
    },
    ob: {
        attr: 'b',
        fn() {
            console.log(this);
            // b
        }
    }
});