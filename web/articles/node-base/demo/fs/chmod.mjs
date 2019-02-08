/**
 * 改变文件权限
 * 文件权限的相关知识参考 linux-base
 */
import fs from 'fs';
const fsPromises = fs.promises;

fsPromises.chmod('./a.js', 777).then(() => {
  console.log('权限修改完成');
});
