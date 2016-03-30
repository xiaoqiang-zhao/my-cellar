# 为什么 div 不能放在 p 中

> 这个结论很多人都知道，但是这个问题所涉及到的知识知道的人就不多了，本篇来谈谈内容模型(content model)。

## 元素分类

### Metadata content

将这个分类直接翻译成“元数据分类”似乎很不合适，我倾向于信译为“外交官”，此类标签用于定义外观或行为，也可以是定义其他文件的引入，或者向外输出信息。

包括的标签有： &lt;base>, &lt;command>, &lt;link>, &lt;meta>, &lt;noscript>, &lt;script>, &lt;style>, &lt;title>.

其中 &lt;title> 就是向浏览器出处信息。

### Flow content

直译为“流元素分类”，普通的文本容器、内嵌标签和文本属于该分类，此分类的标签相当丰富，下面标签全部属于该分类：

 &lt;a>, &lt;abbr>, &lt;address>, &lt;article>, &lt;aside>, &lt;audio>, &lt;b>,&lt;bdo>, &lt;bdi>, &lt;blockquote>, &lt;br>, &lt;button>, &lt;canvas>, &lt;cite>, &lt;code>, &lt;command>, &lt;data>, &lt;datalist>, &lt;del>, &lt;details>, &lt;dfn>, &lt;div>, &lt;dl>, &lt;em>, &lt;embed>, &lt;fieldset>, &lt;figure>, &lt;footer>, &lt;form>, &lt;h1>, &lt;h2>, &lt;h3>, &lt;h4>, &lt;h5>, &lt;h6>, &lt;header>, &lt;hgroup>, &lt;hr>, &lt;i>, &lt;iframe>, &lt;img>, &lt;input>, &lt;ins>, &lt;kbd>, &lt;keygen>, &lt;label>, &lt;main>, &lt;map>, &lt;mark>, &lt;math>, &lt;menu>, &lt;meter>, &lt;nav>, &lt;noscript>, &lt;object>, &lt;ol>, &lt;output>, &lt;p>, &lt;pre>, &lt;progress>, &lt;q>, &lt;ruby>, &lt;s>, &lt;samp>, &lt;script>, &lt;section>, &lt;select>, &lt;small>, &lt;span>, &lt;strong>, &lt;sub>, &lt;sup>, &lt;svg>, &lt;table>, &lt;template>, &lt;textarea>, &lt;time>, &lt;ul>, &lt;var>, &lt;video>, &lt;wbr>, 文本.
 
另外还有一些特殊的标签，如果符合特定情况也也属于该分类，具体如下：

- &lt;area>， 在 &lt;map> 中
- &lt;link>， 有属性 itemprop
- &lt;meta>， 有属性 itemprop
- &lt;style>， 有属性 itemprop

### Sectioning content

直译为“章节元素分类”，但他的实际作用是对 &lt;header>、&lt;footer> 和 `heading content` 的内部结构做区域划分。该分类包含的标签有：
&lt;article>, &lt;aside>, &lt;nav>, &lt;section>. 

注：不要和 `sectioning root` 混淆了， `sectioning root` 从常规分类中脱离了出来。

### Heading content

标题元素分类，用来定义章节(section)的标题，也被称为是章节标签分类的一个特例，或者被用来定义标题内容。该分类包含的标签有： &lt;h1>, &lt;h2>, &lt;h3>, &lt;h4>, &lt;h5>, &lt;h6> and &lt;hgroup>.

### Phrasing content

词组元素分类，用来定义文本或者在文本内容上做标记，也用来引入其他页面、音频、视频等内容。该分类包含的标签有：
&lt;abbr>, &lt;audio>, &lt;b>, &lt;bdo>, &lt;br>, &lt;button>, &lt;canvas>, &lt;cite>, &lt;code>, &lt;command>, &lt;datalist>, &lt;dfn>, &lt;em>, &lt;embed>, &lt;i>, &lt;iframe>, &lt;img>, &lt;input>, &lt;kbd>, &lt;keygen>, &lt;label>, &lt;mark>, &lt;math>, &lt;meter>, &lt;noscript>, &lt;object>, &lt;output>, &lt;progress>, &lt;q>, &lt;ruby>, &lt;samp>, &lt;script>, &lt;select>, &lt;small>, &lt;span>, &lt;strong>, &lt;sub>, &lt;sup>, &lt;svg>, &lt;textarea>, &lt;time>, &lt;var>, &lt;video>, &lt;wbr> 和 文本。

还有一些其他的标签，在满足特定条件的时候也属于该分类：

- &lt;a> 如果只包含段落内容；
- &lt;area> 如果是 &lt;map> 标签的后代标签；
- &lt;del> 如果只包含段落内容；
- &lt;ins> 如果只包含段落内容；
- &lt;link> 如果存在属性 itemprop
- &lt;map> 如果只包含段落内容；
- &lt;meta> 如果存在属性 itemprop

### Embedded content

嵌入元素分类，属于这个分类的标签将其他资源嵌入到页面中，这些资源可以是用非超文本语言编码的资源，或者来自其他域名，属于这个分类的标签有： &lt;audio>, &lt;canvas>, &lt;embed>, &lt;iframe>, &lt;img>, &lt;math>, &lt;object>, &lt;svg>, &lt;video>

### Interactive content

交互元素分类，这个分类专门为和用户交互设计的，属于这个分类的元素有：: &lt;a>, &lt;button>, &lt;details>, &lt;embed>, &lt;iframe>, &lt;keygen>, &lt;label>, &lt;select>, 和 &lt;textarea>。

还有一些其他的标签，在满足特定条件的时候也属于该分类：

- &lt;audio> 如果有 controls 属性存在
- &lt;img> 如果有 usemap 属性存在
- &lt;input> 如果 type 属性值不是 hidden
- &lt;menu> 如果 type 属性值是 toolbar
- &lt;object> 如果有 usemap 属性存在
- &lt;video> 如果有 controls 属性存在

### Form-associated content

可提交的表单相关元素分类，此分类要求元素归属于一个表单，归属的方式有两种：在表单元素里面；元素的 form 属性值是表单的 id(form属性在HTML5中才被支持)。属于这个分类的元素有：&lt;button>, &lt;fieldset>, &lt;input>, &lt;keygen>, &lt;label>, &lt;meter>, &lt;object>, &lt;output>, &lt;progress>, &lt;select>, &lt;textarea>。

另外这个分类还有四个子分类：listed、labelable、submittable、resettable，这里不再详述，需要了解更多信息请参考 [开发者中心相关文档](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_categories#Form-associated_content)。

## Transparent content model



## 其他分类

这里有一个异类 `Sectioning root`，作为单独的一个分类，目前还没有标签按此分类解析，是一个备用分类。

## 参考和扩展

[英文原版](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories)

[标签分类](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_categories)

[标签大全](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)
