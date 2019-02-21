/**
 * 路径相关 Demo
 */

import path from 'path';

// 当前执行文件的路径和文件名
const __filename = new URL(import.meta.url).pathname;
console.log('__filename:', __filename);
// /Users/zhaoxiaoqiang/code-github/my-cellar/web/articles/node-base/demo/path/index.js

// 当前执行文件所在的路径
const __dirname = path.dirname(new URL(import.meta.url).pathname);
console.log('__dirname:', __dirname);
// /Users/zhaoxiaoqiang/code-github/my-cellar/web/articles/node-base/demo/path
