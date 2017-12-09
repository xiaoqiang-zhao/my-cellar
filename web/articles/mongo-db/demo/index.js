/**
 * Demo
 */

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1/mydb', {
    useMongoClient: true
}).then(() => {
    console.log('数据库链接成功');
}, err => {
    console.log('数据库链接失败:', err);
});

// 断开数据库链接
setTimeout(() => {
    mongoose.disconnect(function(){
        console.log("断开连接");
    })
}, 2000);

// 两种写法之一：中规中矩
const userSchema = new Schema({
    name: String
});

const User = mongoose.model('User', userSchema);

// 两种写法之二：简化
// const User = mongoose.model('User', {
//     name: String
// });


var user = new User({
    name: 'bbb'
});

// Create
// user.save().then(() => {
//     console.log('user 保存成功');
// }, res => {
//     console.log('user 保存失败:', err);
// });

// Retrieve
// 找出 users collections 中的所有数据
User.find().then(docs => {
    console.log('[Promise]users all:');
    console.log(docs);
});

User.find((err, docs) => {
    console.log('[callback]users all:');
    console.log(docs);
});

// 找出 users collections 中 name 为 aaa 的所有数据
User.find({
    name: 'aaa'
}, (err, docs) => {
    console.log('users of name is "aaa":');
    console.log(docs);
});

// Update
// 两种写法之一：Promise
// User.update({
//     name: 'bbb'
// }, {
//     name: 'ccc'
// }).then(raw => {
//     console.log('数据更新成功:', raw);
// });
// 两种写法之二：Callback
User.update({
    name: 'bbb'
}, {
    name: 'ccc'
}).exec();

// Remove
User.remove({
    name: 'aaa'
}).exec();
