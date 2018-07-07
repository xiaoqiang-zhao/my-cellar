/**
 * @file async 对于 promise 的优势
 * @author 小强赵
 */
const fs = require('fs-extra');

/**
 * 判断文件夹 hello 是否存在
 * 如果不存在就新建一个
 * 然后向文件夹中添加一个文件 world
 */

// --- promise 方式 --- //
const promisePath = __dirname + '/promise-hello';
fs.exists(promisePath).then(exists => {
    if (exists) {
        console.log('promise: hello文件夹存在');
    }
    else {
        console.log('promise: hello文件夹不存在，新建一个');
        return fs.mkdir(promisePath);
    }
}).then(() => {
    console.log('promise: 开始新建文件 world.md');
    return fs.createFile(promisePath + '/world.md');
}).catch(err => {
    console.log('promise: 新建文件夹失败');
}).then(() => {
    console.log('promise: 文件 world.md 添加完成');
});

// --- async/await 方式 --- //
const asyncPath = __dirname + '/async-hello';
async function task() {
    if (await fs.exists(asyncPath)) {
        console.log('async: 文件夹 hello 存在');
    }
    else {
        console.log('async: hello 文件夹不存在，新建一个');
        await fs.mkdir(asyncPath);
    }
    console.log('async: 开始新建文件 world.md');
    return await fs.createFile(asyncPath + '/world.md').then(() => {
        console.log('async: 文件 world.md 添加完成');
    });
}
task();

console.log('--last code line--');
