# markdown 引擎 remark

> 以一己之力写出一个 markdown 生态。

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

在原有基础上加工输出。

## 参考

https://github.com/remarkjs/remark

公司的高T原话：“js 玩 markdown 建议 remark，其他的都是早晚后悔 ”。

[highlight](https://highlightjs.org/usage/)

https://segmentfault.com/markdown
