/**
 * 向文件中添加内容
 * 当文件不存在时先新建后添加
 */
import fs from 'fs';
const fsPromises = fs.promises;

fsPromises.appendFile('a.md', 'my string', {
    encoding: 'utf8'
}).then(data => {
    console.log('内容添加成功');
});
