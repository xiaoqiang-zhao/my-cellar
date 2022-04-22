# CSS 选择器

> CSS 入门基础。

## 优先级计算

进制计算: 内敛 id class element attr。

!important 优先级最大。

## 选择器

基础: id class element attr

关系选择器 part1: 
 - 分组选择器: .a, .b
 - 子选择器: .a > .b
 - 相邻兄弟选择器: .a + .b
 - 兄弟选择器: .a ~ .b
 - 伪类选择器: .a:hover
 - 属性选择器: .a[a=b]

关系选择器 part2: 
 - 第一个子元素 :first-child
 - 最后一个子元素 :last-child
 - 子元素关系选择器 :nth-child(n)
 - 子元素关系选择器 :nth-of-type(n)，约束条件更严格

first-child 与 first-of-type 的 区别。

```html
<div>
  <p>第一个子元素</p>
  <h1>第二个子元素</h1>
  <span>第三个子元素</span>
  <span>第四个子元素</span>
</div>
```

**first-child**

p:first-child 匹配到的是 p 元素，因为 p 元素是 div 的第一个子元素；
h1:first-child 匹配不到任何元素，因为在这里 h1 是 div 的第二个子元素，而不是第一个；
span:first-child 匹配不到任何元素，因为span和h1一样，都不是div的第一个子元素。

**first-of-type**
p:first-of-type：匹配到的是 p 元素，因为 p 是 div 所以类型为 p 的子元素中的第一个；
h1:first-of-type：匹配到的是 h1 元素，因为 h1 是 div 所以类型为 h1 的子元素中的第一个；
span:first-of-type：匹配到的是第一个 span 元素，这里 div 有俩个 span 子元素，匹配到第一个。

伪类: link visited hover active

伪元素: before after
