var operation = require('../operation');

describe('四则运算测试', function() {
    it('加法测试', function() {
        var result = operation.add(1, 1);
        expect(result).toEqual(2);
    });

    it('乘法测试', function () {
        var result = operation.mult(1, 1);
        expect(result).toEqual(1);
    });
});