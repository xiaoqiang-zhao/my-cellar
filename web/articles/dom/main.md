# Dom 常用操作

> 补充基础知识。

## 获取节点

```js
// 因为ID值在html中唯一，所以此方法只能获取一个节点元素
document.getElementById()
// 根据标签获取特点标签元素集合
document.getElementsByTagName()
// 根据class值获取元素集合
document.getElementsByClassName()

// 选择器语法获取符合条件的第一个元素，IE8以下不支持此语法
document.querySelector()
// 选择器语法选择符合条件的所有元素集合，IE8以下不支持此语法
document.querySelectorAll()

// 获取元素下的所有直属子节点，只读属性，实时变化
element.children
// 获取元素下第一个子节点
element.firstElementChild
// 获取元素下最后一个子节点
element.lastElementChild
// 获取元素最近的一层父元素
element.parentElement
```

## 创建元素和添加其属性

```js
// 创建指定标签的节点
const element = document.createElement('tag_name')
// 更新元素内容，可以包含html标签
element.innerHTML = ''
// 更新元素文本内容，不支持html标签
element.innerText = ''

// 更新元素样式属性值，property需要更改为驼峰命名
element.style.property = ''
// 更新元素的class名称
element.className = ''
// 设置标签的属性值
element.setAttribute('property_name','value')
```

## 插入到文档中

```js
// 添加节点为最后一个子节点
element.appendChild(element)
// 在父元素的指定子节点前面添加子节点
element.insertBefore(newElement, referenceElement)
```

## 从文档中删除

```js
// 拿到待删除节点:
var self = document.getElementById('to-be-removed');
// 拿到父节点:
var parent = self.parentElement;
// 删除:
var removed = parent.removeChild(self);
```

## 表单操作

```js
// 获取text,password,hidden,select类型input的值
input_element.value
// 获取多选框的选项是否勾选，返回值为true / false
input_element.checked

// 设置text,password,hidden,select类型input的值
input_element.value = 'new_value'
// 设置多选框选项是否选择
input_element.checked = true / false
```
