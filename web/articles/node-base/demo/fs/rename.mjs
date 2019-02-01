// const fsPromises = require('fs').promises;

import fs from 'fs';

const fsPromises = fs.promises;

try {
  const result = fsPromises.rename('./a.js', './b.js');
  result.then(error => {
    console.log('-- success --');
  });
}
catch(e) {
  console.log('error');
}
