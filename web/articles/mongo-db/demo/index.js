/**
 * Demo
 */
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/users_test');
mongoose.connect(
    'mongodb://localhost/test',
    // {
    //     useMongoClient: true
    // },
    err => {
        if (err) {
            console.log('连接失败', err);
        }
        else {
            console.log('连接成功');
        }
    }
);
