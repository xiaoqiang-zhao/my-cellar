import fs from 'fs';

const fsPromises = fs.promises;

fsPromises.appendFile('a.md', 'my string', {
    encoding: 'utf8'
}).then(data => {

});
