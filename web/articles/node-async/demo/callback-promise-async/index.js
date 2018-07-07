/**
 * @file callback、promise、async 不同方式对同一功能的实现对比
 * @author 小强赵
 */

const fs = require('fs');
const fsExtra = require('fs-extra');

//## 判断一个文件夹是否存在 ##//

//--- callback 方式 ---//
const path = __dirname + '/node_modules2';
fs.access(path, err => {
    if (err) {
        console.log('callback:文件夹不存在');
    }
    else {
        console.log('callback:文件存在');
    }
});

//--- promise 方式 ---//
fsExtra.access(path).then(() => {
    console.log('promise:文件存在');
}, err => {
    console.log('promise:文件夹不存在');
});

//--- async/await 方式 ---//
async function exists() {
    return await fsExtra.access(path);
}
exists().then(() => {
    console.log('async:文件存在');
}, err => {
    console.log('async:文件夹不存在');
});

console.log('--last code line--');
