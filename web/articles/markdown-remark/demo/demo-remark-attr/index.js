var unified = require('unified');
var remarkParse = require('remark-parse');
var stringify = require('rehype-stringify');
var remark2rehype = require('remark-rehype');
const remarkAttr = require('remark-attr');

const testFile = `
Here a test :

![ache avatar](https://ache.one/res/ache.svg){ height=100 }

`;

unified()
  .use(remarkParse)
  .use(remarkAttr)
  .use(remark2rehype)
  .use(stringify)
  .process(testFile, (err, file) => {
    console.log(String(file))
  });
