/**
 * 判断文件是否存在的Demo
 */

const fs = require('fs');
fs.access(__dirname + '/../main.md', err => {
    if (err) {
        // 文件不存在
        console.log('文件不存在');
    }
    else {
        // 文件存在
        console.log('文件存在');
    }
});
