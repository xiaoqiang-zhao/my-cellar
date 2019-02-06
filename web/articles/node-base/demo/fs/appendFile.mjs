import fs from 'fs';

const fsPromises = fs.promises;

fsPromises.appendFile('a.md', 'my string', {
    encoding: 'utf8'
}).then(data => {
    console.log('内容添加成功');
});
