# CSS 选择器

> CSS 入门基础。

## 优先级计算

进制计算: 内敛 id class element attr。

!importent 优先级最大。

## 选择器

基础：id class element attr

关系选择器 part1：
 - 分组选择器: .a, .b
 - 子选择器: .a > .b
 - 相邻兄弟选择器: .a + .b
 - 兄弟选择器: .a ~ .b
 - 伪类选择器: .a:hover
 - 属性选择器: .a[a=b]

关系选择器 part2：
 - 第一个子元素 :first-child
 - 最后一个子元素 :last-child
 - 子元素关系选择器 :nth-child(n)
 - 子元素关系选择器 :nth-of-type(n)，约束条件更严格

伪类：link visited hover active
