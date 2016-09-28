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

还可以放在 `article` 中作为其尾部：
 
    <article class="user_review">
        <p>Way too scary for me.</p>
        <footer>
            <p>
                Posted on <time datetime="2015-05-16 19:00">May 16</time> by Lisa.
            </p>
        </footer>
    </article>

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

在页面局部中 `header` 和 `footer` 被希望放在 `article` 中，`nav` 放在 `header` 也是不错的选择，比如页面的 Tab 部分用这两个标签配合实现就有很好的语义化。

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

`main` 一个页面中只能有一个所以只能用在大的页面布局中，`section` 希望其中有 heading (`h1` - `h6`) 来识别它本身，而heading中只能放字符串不推荐放其他元素，所以`section` 的使用场景也不多。所以更多的场景是使用`article` 和 `div`，`article` 表示一个独立的结构能完整的呈现一个内容，`div`是无明确含义的标签，修饰性的 dom 结构用此标签比较好，所以一个比较通用的场景就是用 `article` 来框定一个功能或内容块，然后细节由 `div`来表达。

## 与table相关的标签

## 与表单相关的标签

## 修饰文字的标签

## body 之外

## 过时的和未来的

有些标签已经不被推荐使用，这里罗列一下：

有些标签被推荐但是还没有被浏览器广泛支持，如下：

- summary，一个实验中的标签，目前只有部分Chrome支持

## 参考网站

[标签列表 - 中文版](http://www.w3chtml.com/html5/ref/tag-list.html)

[标签列表 - 英文版](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)

[标签分类](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_categories)

