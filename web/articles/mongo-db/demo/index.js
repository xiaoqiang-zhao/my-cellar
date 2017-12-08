/**
 * Demo
 */

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://127.0.0.1/mydb', {
    useMongoClient: true
}).then(() => {
    console.log('数据库链接成功');
}, err => {
    console.log('数据库链接失败:', err);
});

var User = mongoose.model('User', {
    name: String
});

var user = new User({
    name: 'aaa'
});
user.save().then(() => {
    console.log('user 保存成功');
}, res => {
    console.log('user 保存失败:', err);
});
