var remark = require('remark');
var styleGuide = require('remark-preset-lint-markdown-style-guide');
var html = require('remark-html');
var report = require('vfile-reporter');

var unified = require('unified');
var markdown = require('remark-parse')

var mdText = `# 大标题

>说明文字。

## 二级标题`;

remark()
  .use(styleGuide)
  .use(html)
  .process(mdText, function (err, file) {
    console.error(report(err || file));
    console.log(String(file));
  });

var tree = unified()
  .use(markdown)
  .parse(mdText);

console.log('解析输出：', JSON.stringify(tree));