var unified = require('unified');
var remarkParse = require('remark-parse');
var stringify = require('rehype-stringify');
var remark2rehype = require('remark-rehype');
const remarkFirstHeading = require('remark-first-heading');

const testFile = `
Here a test :

![ache avatar](https://ache.one/res/ache.svg){ height=100 }

`;

unified()
  .use(remarkParse)
  .use(remarkFirstHeading, {
      heading: '手动设置标题'
  })
  .use(remark2rehype)
  .use(stringify)
  .process(testFile, (err, file) => {
    console.log(String(file))
  });

// 下面是 remark-first-heading 的源码

'use strict';

var toString = require('mdast-util-to-string');

module.exports = function attacher() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function transformer(root) {
    var heading = {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: options.heading }]
    };

    var first = root.children[0];
    if (first && first.type === 'heading') {
      if (toString(first) !== options.heading) {
        root.children[0] = heading;
      }
    } else {
      root.children.unshift(heading);
    }
  };
};
