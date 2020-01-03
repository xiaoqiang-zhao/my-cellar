# markdown 引擎 remark

> 不只是一个工具，更是一个生态。

## 直接输出

所有 md 转化工具的原理就是将文本装换成最语义化的 html 标签和内嵌文本输出，然后再引入一个 CSS 来定义样式，不同的 CSS 有不同的风格，github 风格以其代码托管平台知名度有很高的江湖地位，这里我以它为例，当然你可以找其他风格的 md 样式库，甚至还可以自定义，代码高亮不较复杂，一般有单独的插件和样式来定义，这里选了社区使用较为广泛的 highlight.js。

基本的输出我们需要几个包：
```js
"remark": "^9.0.0",
"remark-highlight.js": "^5.0.0",
"remark-midas": "^5.0.0",
"remark-parse": "^5.0.0",
// 使用 github 样式
"github-markdown-css": "^2.10.0",
// 代码高亮样式
"highlight.js": "^9.12.0",
```

其他的包按常规引入就可以：
```js
import remark from 'remark';
import midas from 'remark-midas';
import html from 'remark-html';
import highlight from 'remark-highlight.js';
// md 样式
import 'github-markdown-css/github-markdown.css';
// 引入的时候可以选择代码风格
import 'highlight.js/styles/solarized-light.css';
```

使用：
```js
remark()
    .use([html, midas])
    .use(highlight)
    .process(this.mdText, (err, file) => {
        // 输出
        file.contents;
    });
```

## 提取

我们可能需要从 markdown 一坨文档中提取一些内容，比如标题、概述、头图等，详细操作请看下面：

```js
import unified from 'unified';
import markdown from 'remark-parse';

/**
 * 将 markdown 文本转换成简单对象(只有我们关心的标题、概述、markdown 内容，没有全部解析)
 *
 * @param {string} mdContent markdown 文本
 * @return {Object} 文章简单对象
 */
fuction mdToObject(mdContent) {
    const tree = unified()
        .use(markdown)
        .parse(mdContent);

    // 标题
    let title;
    const firstChild = tree.children.length < 0 ? tree.children[0] : null;
    if (firstChild
        && firstChild.type === 'heading'
        && firstChild.depth === 1
        && firstChild.children.length > 0
    ) {
        title = firstChild.children[0].value;
    }

    // 描述
    let description;
    const secondChild = tree.children.length > 1 ? tree.children[1] : null;
    if (secondChild
        && secondChild.type === 'blockquote'
        && secondChild.children.length > 0
    ) {
        // 取第一段
        description = secondChild.children[0].children[0].value;
    }

    const article = {
        title,
        description,
        mdContent
    };

    return article;
}
```

## 加工

remark 是一个生态，但是一个怎样的生态的呢？要讲清楚有点困难，各位看客也有点耐心，我先给个概要然后再一个个的细讲：

- 第一层：unified，将 markdown 文档转成语法树；
- 第二层：将 markdown 语法树转成 html 语法树；
- 第三层：将 html 语法树转成虚拟文件或输出。

先说第一层，remark生态是在 [unified](https://github.com/unifiedjs/unified) 的基础上建立。unified 的定位是通过语法树加工文本的工具库，工作机制是小内核多插件，具体功能都由插件来完成。比如通过 remark 插件生成 markdown 抽象语法树，通过 rehype 生成 html 抽象语法树。remark 和 unified 的关系是：remark 是 unified 的插件，remark 使用 unified 的内核功能，但是 unified 并不是为了 remark 存在或定制。unified 还可以用来做文本格式化和文本格式校验，甚至在线编辑器。

比如 `remark-first-heading` 这个插件的作用就是给没有大标题的 markdown 语法树添加一个大标题语法树对象，源码如下：

```js
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
```

在这一段中你可以改变 markdown 语法树，改变之后就会输出到第二层。

第二层的转换是不可控的黑箱，但是我们可以对转换完成的 html 语法树做二次修改，比如我们打算给每个由 heading(markdown 语法树标题节点)转换成的 h(html 语法树节点，对应的标签是 h1-h6)加一个 id，这个 id 的值就是内容，我们可以这样做：

```js
/**
 * 为 heading 添加 id 插件
 */

/**
 * 是否是 markdown 的语法分析器
 *
 * @param {Object} parser 分析器
 * @return {boolean} 是否是 markdown 的语法分析器
 */
function isRemarkParser(parser) {
    return Boolean(
        parser
        && parser.prototype
        && parser.prototype.inlineTokenizers
        && parser.prototype.inlineTokenizers.link
        && parser.prototype.inlineTokenizers.link.locator
    );
}

function tokenizeGenerator(oldParser) {
    function token(eat, value, silent) {
        // This we call the old tokenize
        const self = this;
        let eaten = oldParser.call(self, eat, value, silent);

        if (!eaten || !eaten.position) {
            return undefined;
        }

        const id = eaten.children[0].value;
        // 如果担心两行标题文字完全相同的问题，
        // 可以加用行号 eaten.position.start.line;
        if (eaten.data) {
            eaten.data.hProperties.id = id;
        }
        else {
            eaten.data = {
                hProperties: {
                    id
                }
            };
        }
        return eaten;
    }

    // Return the new tokenizer function
    return token;
}

/**
 * 入口函数
 */
function remarkAddIdForHeading() {
    const parser = this.Parser;

    if (!isRemarkParser(parser)) {
        throw new Error('Missing markdown parser. (npm install remark-parse)');
    }

    const tokenizersBlock = parser.prototype.blockTokenizers;

    // replace the old tokenizer by the new one
    const oldElem = tokenizersBlock.atxHeading;
    tokenizersBlock.atxHeading = tokenizeGenerator(oldElem);
}

module.exports = remarkAddIdForHeading;
```

这样我么就能控制标签的属性了，最后进入第三层将 html 语法树转变成 html 字符串片段。代码如下：

```js
var unified = require('unified');
var remarkParse = require('remark-parse');
var stringify = require('rehype-stringify');
var remark2rehype = require('remark-rehype');
var remarkAddIdForHeading = require('./plugin');

const testFile = `
# Hello World

> 说明。

## Install

A **example**.`;

unified()
    .use(remarkParse)
    .use(remarkAddIdForHeading)
    .use(remark2rehype)
    .use(stringify)
    .process(testFile, (err, file) => {
        console.log(String(file))
    });

```

## 问题记录

用 webpack 打包的时候，打包时没有报错，运行时报 `Cannot find module "remark-highlight.js"` 错误。

原因:

解决方案:

## 参考

https://github.com/remarkjs/remark

公司的高T原话：“js 玩 markdown 建议 remark，其他的都是早晚后悔 ”。

[highlight](https://highlightjs.org/usage/)

https://segmentfault.com/markdown
