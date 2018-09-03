# markdown 引擎 remark

> 以一己之力写出一个 markdown 生态。

## 直接输出

直接输出时最基本的能力，支持的多种插件，表格、代码高亮、数学供述。CSS 是否提供，怎么自定义。

我们需要几个包
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

，比如：
```js
import 'highlight.js/styles/solarized-light.css';
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
    const firstChild = tree.children[0];
    if (firstChild.type === 'heading'
        && firstChild.depth === 1
        && firstChild.children.length > 0
    ) {
        title = firstChild.children[0].value;
    }

    // 描述
    let description;
    const secondChild = tree.children[1];
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
