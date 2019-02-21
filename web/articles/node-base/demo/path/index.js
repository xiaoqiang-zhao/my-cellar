/**
 * 路径相关 Demo
 */
const path = require('path');
// 当前执行文件的路径和文件名
console.log('__filename:', __filename);

// 当前执行文件所在的路径
console.log('__dirname:', __dirname);

// 获取两个目录间的相对路径
const relativePath = path.relative('/Users/zhaoxiaoqiang/code-github', '/Users');
console.log('relativePath:', relativePath);
// ../..
const relativePath2 = path.relative('/Users/zhaoxiaoqiang/code-github', '/Users/work');
console.log('relativePath2:', relativePath2);
// ../../work

// 当前的执行路劲
const cwdPath = process.cwd();
console.log('cwdPath:', cwdPath);

// file 的 ./ 就是这个路径
const relativePath3 = path.relative(__dirname, './');
console.log('relativePath3:', relativePath3);
const relativePath4 = path.relative(__dirname, cwdPath);
console.log('relativePath4:', relativePath4);
