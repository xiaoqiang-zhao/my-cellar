# 为什么 div 不能放在 p 中

> 这个结论很多人都知道，但是这个问题所涉及到的知识知道的人就不多了，本篇来谈谈HTML元素的渲染模型。

## 答题

每一个元素再被渲染的时候都会被识别为一个内容模型，但是一个元素可以属于零到多个内容模型，根据渲染时的实际情况来决定使用何种渲染模型。打个比方，元素是一个“男人”，当男人的爸爸叫一声“儿子”，这时男人就会应答一声 -- “儿子在这”，这相当与渲染，在这种情况下“男人”这个元素就被当做儿子模型来渲染；如果男人的老婆叫一声“老公”，这时男人应答为 “老公在这”，在这种情况下“男人”这个元素就被当做老公模型来渲染；那男人的爸爸和老婆同时叫“儿子”和“老公”可以吗？或许实际生活中是可以的，但在元素渲染这个机制下是不可以的，应为这样的话男人就不知道如何应答了，也就是说元素在实际渲染中只能按一个渲染模型来渲染。另外如果有人叫“闺女”，那男人无论如何都不会应答，将 div 放在 p 下就犯了这种错误。

每个元素可以按哪几种渲染模型渲染，可以被哪几种模型的元素当做子元素，子元素又可以包含哪几种模型的元素，在 规范中都可以找到，例如在[ p 元素的文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p)中就定义了其子元素只能是 `Phrasing content` 这种模型的元素，但是我们去查[ div 元素的文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div)，发现 div 同学只能被解析成`Flow content` 和 `palpable content`两种模型，这就造成了对着一个“男人”喊“闺女”不被搭理的现象。

关于渲染模型分类的知识请接看下面的章节。

## 元素渲染模型分类

### Metadata content

将这个分类直接翻译成“元数据分类”似乎很不合适，我倾向于信译为“外交官”，此类标签用于定义外观或行为，也可以是定义其他文件的引入，或者向外输出信息。

包括的标签有： `base`, `command`, `link`, `meta`, `noscript`, `script`, `style`, `title`.

其中 `title` 就是向浏览器出处信息。

### Flow content

直译为“流元素分类”，普通的文本容器、内嵌标签和文本属于该分类，此分类的标签相当丰富，下面标签全部属于该分类：

 `a`, `abbr`, `address`, `article`, `aside`, `audio`, `b`,`bdo`, `bdi`, `blockquote`, `br`, `button`, `canvas`, `cite`, `code`, `command`, `data`, `datalist`, `del`, `details`, `dfn`, `div`, `dl`, `em`, `embed`, `fieldset`, `figure`, `footer`, `form`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `header`, `hgroup`, `hr`, `i`, `iframe`, `img`, `input`, `ins`, `kbd`, `keygen`, `label`, `main`, `map`, `mark`, `math`, `menu`, `meter`, `nav`, `noscript`, `object`, `ol`, `output`, `p`, `pre`, `progress`, `q`, `ruby`, `s`, `samp`, `script`, `section`, `select`, `small`, `span`, `strong`, `sub`, `sup`, `svg`, `table`, `template`, `textarea`, `time`, `ul`, `var`, `video`, `wbr`, 文本.
 
另外还有一些特殊的标签，如果符合特定情况也也属于该分类，具体如下：

- `area`， 在 `map` 中
- `link`， 有属性 itemprop
- `meta`， 有属性 itemprop
- `style`， 有属性 itemprop

### Sectioning content

直译为“章节元素分类”，但他的实际作用是对 `header`、`footer` 和 `heading content` 的内部结构做区域划分。该分类包含的标签有：
`article`, `aside`, `nav`, `section`. 

注：不要和 `sectioning root` 混淆了， `sectioning root` 从常规分类中脱离了出来。

### Heading content

标题元素分类，用来定义章节(section)的标题，也被称为是章节标签分类的一个特例，或者被用来定义标题内容。该分类包含的标签有： `h1`, `h2`, `h3`, `h4`, `h5`, `h6` and `hgroup`.

### Phrasing content

词组元素分类，用来定义文本或者在文本内容上做标记，也用来引入其他页面、音频、视频等内容。该分类包含的标签有：
`abbr`, `audio`, `b`, `bdo`, `br`, `button`, `canvas`, `cite`, `code`, `command`, `datalist`, `dfn`, `em`, `embed`, `i`, `iframe`, `img`, `input`, `kbd`, `keygen`, `label`, `mark`, `math`, `meter`, `noscript`, `object`, `output`, `progress`, `q`, `ruby`, `samp`, `script`, `select`, `small`, `span`, `strong`, `sub`, `sup`, `svg`, `textarea`, `time`, `var`, `video`, `wbr` 和 文本。

还有一些其他的标签，在满足特定条件的时候也属于该分类：

- `a` 如果只包含段落内容；
- `area` 如果是 `map` 标签的后代标签；
- `del` 如果只包含段落内容；
- `ins` 如果只包含段落内容；
- `link` 如果存在属性 itemprop
- `map` 如果只包含段落内容；
- `meta` 如果存在属性 itemprop

### Embedded content

嵌入元素分类，属于这个分类的标签将其他资源嵌入到页面中，这些资源可以是用非超文本语言编码的资源，或者来自其他域名，属于这个分类的标签有： `audio`, `canvas`, `embed`, `iframe`, `img`, `math`, `object`, `svg`, `video`

### Interactive content

交互元素分类，这个分类专门为和用户交互设计的，属于这个分类的元素有：: `a`, `button`, `details`, `embed`, `iframe`, `keygen`, `label`, `select`, 和 `textarea`。

还有一些其他的标签，在满足特定条件的时候也属于该分类：

- `audio` 如果有 controls 属性存在
- `img` 如果有 usemap 属性存在
- `input` 如果 type 属性值不是 hidden
- `menu` 如果 type 属性值是 toolbar
- `object` 如果有 usemap 属性存在
- `video` 如果有 controls 属性存在

### Form-associated content

可提交的表单相关元素分类，此分类要求元素归属于一个表单，归属的方式有两种：在表单元素里面；元素的 form 属性值是表单的 id(form属性在HTML5中才被支持)。属于这个分类的元素有：`button`, `fieldset`, `input`, `keygen`, `label`, `meter`, `object`, `output`, `progress`, `select`, `textarea`。

另外这个分类还有四个子分类：listed、labelable、submittable、resettable，这里不再详述，需要了解更多信息请参考 [开发者中心相关文档](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_categories#Form-associated_content)。

## 透明内容模型

`Transparent content model`，这里的透明并不是视觉上的透明，透明内容模型的元素必须满足两个条件：
- 必须是 HTML5 规范的有效元素；
- 如果把此标签移除掉，剩下的元素也依然符合 HTML5 规范。

例如  `del` 和 `ins` 就是透明内容模型，如果有这样一段 HTML：

	<p>We hold these truths to be <del><em>sacred &amp; undeniable</em></del> <ins>self-evident</ins>.</p>

那么我把这两个元素移除后，这段 HTML 依然符合 HTML5 规范。

	<p>We hold these truths to be <em>sacred &amp; undeniable</em> self-evident.</p>

## 其他内容模型

这里有一个异类 `Sectioning root`，作为单独的一个分类，目前还没有标签按此分类解析，是一个备用分类。

## 一点点感悟

刚入行的时候面试经常被问到元素分类的问题，那时以为“行内元素和块状元素”就是标准答案，再后来的很长一段时间里依然这么认为，期间也面过很多人，还没有人给过这个层次的回答。直到最近系统研究 HTML5 元素，发现每个元素都有内容分类、许可内容、父元素这么几个特性，那么问题来了，除了 div 不能放在 p 中，还有其他类似的禁忌吗？

## 参考和扩展

[英文原版](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories)

[标签分类](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_categories)

[标签大全](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)
