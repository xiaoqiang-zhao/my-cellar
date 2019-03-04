# 前端编码规范

> 凡有代码处兼应有规范。

## 市面上的编码规范

### 国内大厂

百度的编码规范：

规范文档：
https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md

配置文件：
https://github.com/ecomfe/fecs/tree/master/lib

腾讯编码规范：
http://alloyteam.github.io/CodeGuide/

阿里的编码规范没有找到，欢迎补充。

### 国外大厂

Airbnb 的编码规范：
- 官方：https://github.com/airbnb/javascript
- 中文翻译：https://github.com/sivan/javascript-style-guide/blob/master/es5/README.md

Google 的编码规范：
https://google.github.io/styleguide/javascriptguide.xml

### 独立组织

国际标准编码规范：
https://github.com/standard/standard

vue 组件的编码规范：
https://github.com/pablohpsilva/vuejs-component-style-guide

vue 官方风格指南：
https://cn.vuejs.org/v2/style-guide/index.html

vue 源码的编码规范：
2 space index, never semicolon.

## 优劣分析

百度的编码规范脱胎于谷歌编码规范，属于比较老牌的编码规范，比如百度的规范缩进是 4 个空格，谷歌编码规范没有样式预处理器的编码规范。

国际编码规范是认可度比较广泛的 -- 13886 star(相对于 Google 一揽子规范 11387 star，Aribnb 1006)，功能开箱既用，node API 丰富，IDE 插件丰富，多语言文档完整，但是只有 js 的规范，没有 HTML 和 CSS 及样式预处理器规范。

腾讯的覆盖面较广，从文件命名到HTML，连 CSS 属性的顺序都给了推荐，样式预处理器只有 Sass。

[腾讯](http://alloyteam.github.io/CodeGuide/#css) 和 [Airbnb](https://github.com/airbnb/css) 都给出了 Sass 的规范，可见预处理器 Sass 是比较受欢迎的。

## eslint rules

配置：[https://eslint.org/docs/rules/](https://eslint.org/docs/rules/)

## 参考

[javascript检验工具的比较](http://zhenhua-lee.github.io/tools/linter.html)

[jslint to eslint](https://www.qianduan.net/jslint-to-eslint/)

[eslint](https://github.com/eslint/eslint)

[eslint 中文版配置](https://segmentfault.com/a/1190000004468428)

[百度 ESLint 的使用规则](https://github.com/ecomfe/fecs/wiki/ESLint)

[百度 ESLint 的配置规则](https://github.com/ecomfe/fecs/blob/master/lib/js/eslint.yml)
