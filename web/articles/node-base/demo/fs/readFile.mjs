/**
 * 一次性读写文件
 */

import fs from 'fs';
const fsPromises = fs.promises;

fsPromises.readFile('./readFile-demo.txt', {
    encoding: 'utf-8'
}).then(content => {
    return fsPromisess.writeFile('./readFile-demo-2.txt', content, {
        encoding: 'utf-8'
    });
}).then(() => {
    console.log('读写完成');
}, error => {
    console.log('-- error --', error);
});
