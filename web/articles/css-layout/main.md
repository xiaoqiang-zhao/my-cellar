# CSS 布局

> 收集常用布局。

## 一弹一剩

这是一个双列布局，一个侧栏 + 一个主体，侧栏宽度根据内容确定(我们称之为弹性侧栏，实际应用中会给最大宽度)，主体显示区宽度是容器剩下宽度。

```html
<div class="container">
  <div class="aside">侧栏</div>
  <div class="main">主内容区</div>
</div>
```

```css
.container {
  display: flex;
  padding: 5px;
  background: #eee;
}
.aside {
  flex: 0 0 auto;
  background: #ddd;
  padding: 5px;
}
.main {
  padding: 5px;
  flex: 1 1 auto;
  background: #ccc;
}
```

原理: 

flex 的值是这样的:
`flex-grow` 子项放大比例，默认为0，即如果存在剩余空间，也不放大；如果有`flex-basis`配置，分配的空间是剩余空间，如果没有配置，分配的是全部空间。
`flex-shrink` 子项缩小比例，默认为1，即如果空间不足，该项目将缩小。
`flex-basis` 在分配多余空间之前，子项占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

1. 布局解析的时候是先解析 `flex-basis`，这样就保证了侧栏的宽度是按内容撑开的。在项目中，为了保险起见需要给一个大一点的安全宽度，不能任由内容无限制的往开撑。
2. 然后将侧栏的 `flex-grow` 设为 0，主区域的 `flex-grow` 设为 1，保证了侧栏不在分配剩余空间，并且剩余空间全部分配给主区域。
3. 侧栏 `flex-shrink` 设置为 0，保证不受压缩。

## 定宽流式

## 不定宽流式

