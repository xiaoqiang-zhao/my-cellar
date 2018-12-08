# 整理HTML元素

> HTML5 添加了一些新的元素，这有助于 HTML 语义化，语义化是 HTML 十分重要的一部分，本篇就来收集整理 HTML 元素，同时给出一些典型的场景实现。

## 概述

具体一共有多少个 HTML 元素？如果有人问你这个问题你最好离他远一点，如果你看一个人不爽想和吵架就拿这个问题问他。HTML 历经风雨，曾今的小鲜肉如今很多已经蜡黄(不推荐使用)有的甚至已经进入坟墓(部分浏览器已经不再对其支持)，我们这篇谈论的是像林志颖这样的经过岁月洗礼依然容颜不老的经典元素 和 HTML5新添加的像鹿晗这样的小鲜肉元素。

一共多少个可用的标签呢？现在我也不知道，我们一起来数一数。门前大桥下游过一群鸭，快来快来数一数，二四六七八...

## 用来布局的那些标签

### header

`header` 元素表示一组引导性的帮助，可能包含标题元素，也可以包含其他元素，像logo、分节头部、搜索表单等。

[更多解释](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/header)

### article

`article`元素表示文档、页面、应用或网站中的独立结构，其意在成为可独立分配的或可复用的结构，如在发布中，它可能是论坛帖子、杂志或新闻文章、博客、用户提交的评论、交互式组件，或者其他独立的内容项目。

[更多解释](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article)

### footer

`footer` 元素表示最近一个章节内容或者根节点（sectioning root ）元素的页脚。一个页脚通常包含该章节作者、版权数据或者与文档相关的链接等信息。在表格为主体的页面片段中可以这样，用来盛放分页内容或者加载中等信息：

```html
<section>
    <header>搜索条件区</header>
    <table>表格主体区，这里省去内部很多元素</table>
    <footer>
        加载中...
    </footer>
</section>
<!-- 或者 -->
<section>
    <header>搜索条件区</header>
    <table>表格主体区，这里省去内部很多元素</table>
    <footer>
        <button>上一页</button><button>下一页</button>
    </footer>
</section>
```

还可以放在 `article` 中作为其尾部：

```html
<article class="user_review">
    <p>Way too scary for me.</p>
    <footer>
        <p>
            Posted on <time datetime="2015-05-16 19:00">May 16</time> by Lisa.
        </p>
    </footer>
</article>
```

[更多解释](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/footer)

### aside

`aside` 元素中连接到页面中其他部分的内容，被认为是独立于该内容的一部分并且可以被单独的拆分出来而不会使整体受影响。其通常表现为侧边栏或者被插入在该内容里。他们通常包含在工具条，例如来自词汇表的定义。也可能有其他类型的信息，例如相关的广告、笔者的传记、web 应用程序、个人资料信息，或在博客上的相关链接。

[更多解释](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/aside)

### nav

`nav` 描绘一个含有多个超链接的区域，这个区域包含转到其他页面，或者页面内部其他部分的链接列表。可用于导航和友情链接部分。

[更多解释](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/nav)

### main

`main` 呈现了文档 `body` 或应用的主体部分。主体部分由与文档直接相关，或者扩展于文档的中心主题、应用的主要功能部分的内容组成。这部分内容在文档中应当是独一无二的，不包含任何在一系列文档中重复的内容，比如侧边栏，导航栏链接，版权信息，网站logo，搜索框（当然，文档的主要功能就是搜索框）。

注意：
- 不能放在 `article`, `aside`, `footer`, `header`, 或 `nav` 中；
- 在一个文档中不能出现一个以上。 

[更多解释](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main)

### section

`section` 表示文档中的一个区域（或节），比如，内容中的一个专题组，一般来说会有包含一个 heading。一般通过是否包含一个标题 (`h1`-`h6` 元素) 作为子节点来辨识每一个`section`。

注意：
- 如果元素内容可以分为几个部分的话，应该使用 `article` 而不是 `section`;
- 不要把 `section` 元素作为一个普通的容器来使用；这种情况是 `div` 的适用范围，特别是当它的目标只是美化样式的情况。 通常来说一个 `section` 应该出现在文档的框架中。

[更多解释](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section)

### div

让这个哥们儿压轴绝对够分量，他一度成为HTML全体元素的代名词，你一定听说过“div + css”这种说法，在曾经的一段时间里面很多页面中满屏的 div，有人给这种现象起了个名字叫 “div 滥用”。那么怎样避免滥用，正确的用法是什么呢？下面一段是官方给出的建议：

`div` 元素 (或 HTML 文档分区元素) 是一个通用型的流内容容器，它在语义上不代表任何特定类型的内容，它可以被用来对其它元素进行分组，一般用于样式化相关的需求（使用 class 或 id 特性) 或者对具有相同特性的一组元素进行分组 (比如 lang)，它应该在没有任何其它语义元素可用是才使用 (比如 `article` 或 `nav`) 。

也就是说 div 是一个超级备胎，当你找不到合适的元素时用它就好了。

[更多解释](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div)

### 综述

H5的布局相关的标签一共有8个：
`header` `article` `footer` `aside` `nav` `main` `section` `div`，
前五个比较通用，可以用在页面的整体布局上也可以用在局部的页面块中，下面是页面布局的两个示例：

```html
<body>
    <header> 头部</header>
    <aside> 侧栏</aside>
    <main> 主体</main>
    <footer> 尾部</footer>
</body>
<!-- 或者如果在布局上需要将aside和main包起来，一定要用 div -->
<body>
    <header> 头部</header>
    <div>
        <aside> 侧栏</aside>
        <main> 主体</main>
    </div>
    <footer> 尾部</footer>
</body>
```

在页面局部中 `header` 和 `footer` 被希望放在 `article` 中，`nav` 放在 `header` 也是不错的选择，比如页面的 Tab 部分用这两个标签配合实现就有很好的语义化。

```html
<article class="con-tab"> <!-- Tab容器 -->
    <header>
        <nav>
            <button>tab title 1</button>
            <button>tab title 2</button>
        </nav>
    </header>
    <div class="con-content">
        <article>tab content 1</article>
        <article>tab content 2</article>
    </div>
</article>
```

`main` 一个页面中只能有一个所以只能用在大的页面布局中，`section` 希望其中有 heading (`h1` - `h6`) 来识别它本身，而heading中只能放字符串不推荐放其他元素，所以`section` 的使用场景也不多。所以更多的场景是使用`article` 和 `div`，`article` 表示一个独立的结构能完整的呈现一个内容，`div`是无明确含义的标签，修饰性的 dom 结构用此标签比较好，所以一个比较通用的场景就是用 `article` 来框定一个功能或内容块，然后细节由 `div`来表达。

有一个比较蛋疼的事，有了 `header` 和 `footer` 却找不到合适的元素来承载中间部分。

## table及其相关的标签

先上一段比较全的代码：

```html
<table>
    <caption>表格标题</caption>
    <colgroup>
        <col span="2" class="columns" style="background-color:red">
    </colgroup>
    <thead>
        <tr>
            <th>列 1 头</th>
            <th>列 2 头</th>
            <th>列 3 头</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>列 1 内容</td>
            <td>列 2 内容</td>
            <td>列 3 内容</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>列 1 尾</td>
            <td>列 2 尾</td>
            <td>列 3 尾</td>
        </tr>
    </tfoot>
</table>
```

有用的标签：`table`、`thead`、`tbody`、`tr`、`th`、`td`，一共只有 6 个需要了解。

`colgroup` 和 `col` 完全可以用样式取代，`tfoot` 使用场景很罕见也可以忽略。

## 与表单相关的标签

提交数据的元素

`form`、`input`、`select`、`datalist` 可输入选择框、`option`、`optgroup` 对 option 元素分组，`textarea`、`button`、`fildset` 对表单中的控制元素进行分组(`legend` 定义分组标题)， 还有一个 `label` 也放在这里吧，实现表单元素辅助功能，一共 11 个元素。

## 特定内容标签

文本：`span` 普通文本，`b` 加粗文本，`em` 标记需要用户着重阅读的内容，`strong` 表示十分重要的内容，`mark` 突出显示的文字(例如显示搜索引擎搜索后关键词)，`small` 文本的字体变小一号，`i` 区分普通文本的一系列文本，`del` 删除文本，`dfn` 引用，`a` 链接，`address` 地址，`time` 时间，`data` 指定内容和机器可读的翻译联系在一起，`kbd` 定义需要用户用键盘输入的内容，`p` 段落，`blockquote` 块级引用，`cite` 作品的引用，`code` 计算机代码片段，`output` 计算或用户操作的结果，`samp` 标识计算机程序输出，`h1-h6` 头，`sub` 下角标，`sup` 上角标，`var` 定义变量，`q` 表示一个封闭的并且是短的行内引用的文本。(共 30 个)

富媒体：`img` 图片，`audio` 音频，`video` 视屏，`source` 为 audio 和 video 指定源，`track` 为 audio 和 video 指定字幕，`canvas` 画布，`embed` 将外部内容嵌入文档中的指定位置，`iframe` 引入其他页面作为页面部分内容，`meter` 已知范围的标量值或者分数值，`progress` 一项任务的完成进度。(共 10 个)

特定形式数据：`ul` 无序列表容器，`ol` 有序列表容器，`li` 列表元素(用在ul、li、menu 元素中)；`dl` 术语定义以及描述列表容器，`dt` 术语，`dd` 术语描述；`details` 和 `summary` 配合实现概述直接展示和详情展开收起切换；`figure` 定义独立的引用单元，当这部分删除时不会影响到主体，`figcaption` 来为其关联一个标题(作为它的第一个或者最后一个子元素)，`ruby` `rp` ` rt` 三个元素配合展示东亚文字注音或字符注释。(共 13 个)

## 格式标签

`hr` 一个水平，现在它仍能在可视化浏览器中表现为水平线，但目前被定义为语义上的，而不是表现层面上。

`br` 换行。

`pre` 按照原文件中的编排，以等宽字体的形式展现出来，文本中的空白符（比如空格和换行符）都会显示出来。

`wbr` 一个文本中的位置，其中浏览器可以选择来换行，虽然它的换行规则可能不会在这里换行。

## 功能性标签

`html` 和 `body` 对应页面和内容的主要容器，有一点需要注意，这两个容器是内容自适应的，它们并不会默认填满可视窗口，但是他们的背景却会填满可视窗口(如果设置了的话)，这是这个元素特殊的地方。可以用 `min-height: 100vh;` 样式来修补这个不一致。

`head` 页面的头。

`meta` 和 `title` 设置页面，可以设置页面编码和移动端高清屏适配：

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

`link` 和 `style` 样式引入和定义。

`script` 脚本引入标签

`noscript` 无脚本时呈现内部内容，可以用来做 SEO。

## 可用样式替换的标签

`abbr` 缩进，可以用样式 `text-indent: 2em` 代替。

`dbo` 使字符按给定的方向排列，可以用样式 `writing-mode` 代替。

## 已经很少使用的标签

`map` 和 `area` 配合实现图片热区，很少被用在项目中了。

`base` 指定用于一个文档中包含的所有相对URL的基本URL，使用场景基本消失了。

`bdi` 是 Bidirectional Isolate 的缩写，直译为双向隔离，有很好的语义化，在页面大部分内容是硬编码只有少部分是从数据库或其他地方引入时用此标签标记能有很好的区分效果，当前的页面大部分是从数据库中读取，也就丧失的独特性，从而没有必要来标识了。

`ins` 定义已经被插入文档中的文本。

## 参考网站

[标签列表 - 中文版](http://www.w3chtml.com/html5/ref/tag-list.html)

[标签列表 - 英文版](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)

[标签分类](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_categories)
