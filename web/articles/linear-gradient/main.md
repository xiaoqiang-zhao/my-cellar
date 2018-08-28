# CSS3 渐变

> 用到了就学彻底。

## linear-gradient

先给个语法:

```css
background: linear-gradient(角度, 颜色 百分比[可以写多个颜色]));
```

示例：

```css
background: linear-gradient(30deg, rgba(255, 0, 0) 50%, rgba(255, 0, 0, .5));
```

可以设置多个颜色渐变，也可以设置多个颜色叠加：
```css
background: linear-gradient(rgba(255, 0, 0), rgba(255, 0, 0, 0) 50%),
            linear-gradient(to top, rgb(64, 33, 240), rgba(64, 33, 240, 0) 50%);
```

## 参考

[linear-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient)