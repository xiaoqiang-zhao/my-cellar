# 为什么 div 不能放在 p 中

> 这个结论很多人都知道，但是这个问题所涉及到的知识知道的人就不多了，本篇来谈谈内容模型(content model)。

## 元素分类

### Metadata content

将这个分类直接翻译成“元数据分类”似乎很不合适，我倾向于信译为“外交官”，此类标签用于定义外观或行为，也可以是定义其他文件的引入，或者向外输出信息。

包括的标签有： &lt;base>, &lt;command>, &lt;link>, &lt;meta>, &lt;noscript>, &lt;script>, &lt;style>, &lt;title>.

其中 &lt;title> 就是向浏览器出处信息。

### Flow content

直译为“流动标签分类”，普通的文本容器、内嵌标签和文本属于该分类，此分类的标签相当丰富，下面标签全部属于该分类：
 &lt;a>, &lt;abbr>, &lt;address>, &lt;article>, &lt;aside>, &lt;audio>, &lt;b>,&lt;bdo>, &lt;bdi>, &lt;blockquote>, &lt;br>, &lt;button>, &lt;canvas>, &lt;cite>, &lt;code>, &lt;command>, &lt;data>, &lt;datalist>, &lt;del>, &lt;details>, &lt;dfn>, &lt;div>, &lt;dl>, &lt;em>, &lt;embed>, &lt;fieldset>, &lt;figure>, &lt;footer>, &lt;form>, &lt;h1>, &lt;h2>, &lt;h3>, &lt;h4>, &lt;h5>, &lt;h6>, &lt;header>, &lt;hgroup>, &lt;hr>, &lt;i>, &lt;iframe>, &lt;img>, &lt;input>, &lt;ins>, &lt;kbd>, &lt;keygen>, &lt;label>, &lt;main>, &lt;map>, &lt;mark>, &lt;math>, &lt;menu>, &lt;meter>, &lt;nav>, &lt;noscript>, &lt;object>, &lt;ol>, &lt;output>, &lt;p>, &lt;pre>, &lt;progress>, &lt;q>, &lt;ruby>, &lt;s>, &lt;samp>, &lt;script>, &lt;section>, &lt;select>, &lt;small>, &lt;span>, &lt;strong>, &lt;sub>, &lt;sup>, &lt;svg>, &lt;table>, &lt;template>, &lt;textarea>, &lt;time>, &lt;ul>, &lt;var>, &lt;video>, &lt;wbr>, 文本.
 
另外还有一些特殊的标签，如果符合特定情况也也属于该分类，具体如下：

- &lt;area>， 在 &lt;map> 中
- &lt;link>， 有属性 itemprop
- &lt;meta>， 有属性 itemprop
- &lt;style>， 有属性 itemprop

### Sectioning content

直译为“章节标签分类”，但他的实际作用是对 &lt;header>、&lt;footer> 和 `heading content` 的内部结构做区域划分。下面标签属于该分类：
&lt;article>, &lt;aside>, &lt;nav>, &lt;section>. 

注：不要和 `sectioning root` 混淆了， `sectioning root` 从常规分类中脱离了出来。

### Heading content

### Phrasing content

### Embedded content

### Interactive content

### Palpable content

### Form-associated content

## Transparent content model

## 其他分类

这里有一个异类 `Sectioning root`，作为单独的一个分类，目前还没有标签按此分类解析，是一个备用分类。

## 参考和扩展

[标签分类](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_categories)

