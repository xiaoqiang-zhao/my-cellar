var unified = require('unified');
var stream = require('unified-stream');
var markdown = require('remark-parse');
var remark2rehype = require('remark-rehype');
var html = require('rehype-stringify');
var rehypeRaw = require('rehype-raw');
var format = require('rehype-format');
var visit = require('unist-util-visit');

console.log('unified 自定义插件');
var processor = unified()
  .use(markdown)
  // 自定义插件
  .use(tree => {
    // console.log(arguments);
    // visit(tree, 'ParagraphNode', visitor);

    // function visitor(node) {
    //   console.log(node);
    // }
  })
  .use(remark2rehype)
  .use(rehypeRaw)
  .use(format)
  .use(html);

process.stdin.pipe(stream(processor)).pipe(process.stdout);
// console.log('processor: ', processor);
