/**
 * @file operation.test.js 测试脚本
 *
 * Created by longze on 2017/5/2.
 */

var expect = require('chai').expect;
var operation = require('../operation');

describe('四则运算测试', () => {
    it('加法测试', () => {
        var result = operation.add(1, 1);
        expect(result).to.be.equal(2);
    });

    it('乘法测试', () => {
        var result = operation.mult(1, 1);
        expect(result).to.be.equal(1);
    });
});