/**
 * Created by zhaoxiaoqiang on 2017/5/4.
 */
var chromedriver = require('chromedriver');
module.exports = {
    before : function(done) {
        chromedriver.start();

        done();
    },

    after : function(done) {
        chromedriver.stop();

        done();
    }
};