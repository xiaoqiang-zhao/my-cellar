# sketch 自学笔记

> 用到什么学什么，想要独立开发一款应用，设计就少不了了。正好要开发一款桌面软件，拿来练练手。

## 概要

和 photoshop 对标为什么是 sketch? PS 可以做的很艺术，但是学习和设计比 sketch 耗时间。sketch 更适合软件设计。

本文学习的是 sketch 3。

## 安装

官网下载: http://www.sketchcn.com/

sketch 可以说是绿色版的，Mac 下载直接可用，不过我好事把它拷贝进了 Applications。

软件并不免费，试用期 30 天也基本够用了。

## 用户手册

中文: http://www.sketchcn.com/sketch-chinese-user-manual.html

英文: https://www.sketch.com/docs/getting-started/

阅读时间约 16 分钟。

摘要:

Sketch 里没有浮动面板，检查器将会根据你选中的工具来显示所需控件，这样你能始终不受打扰的在画布上创作。

如果你想在画布中设置一个固定的画框，你只需新建一个或多个新的画板。举个例子，设计移动应用界面时，很多设计师会为应用的每一个屏都创建一个画板，然后排列开来以便查看。

如果你想在画布中设置一个固定的边框，你可以直接用画板 (Artboard) 工具创造一个新的画板。

标尺，参考线，网格

## 基本概念

page，页面，这里的页面指一组页面而非单个页面，可以展现一个业务分支的全部交互逻辑。

artBoard，画板，一般可以放应用的一个或多个页面，导出 pdf 时一个画板占一页，如果要花连接图需要把页面都放在一个画板中。注意只有在画板中的元素才能导出或打印，利用这个特性在画板之外可以添加一些描述和说明类内容。

group，组，可以把元素打包成组方便管理。

## 应用类型

提供了 6 中模板，文件 / 从模板新建:
- Android Icon Design(安卓图标设计);
- iOS App Icon(苹果图标设计);
- Material Design(素材设计), 可以是图标、组件等设计元素;
- Prototyping Tutorial(原型图), 可以跨画板连线;
- Smart Layout Tutorial(智能布局)
- Web Design(网页设计), 提供 4 中设备上的布局，Desktop HD、Desktop、Table Portrait、Mobile Portrait，响应式设计。

原型图中可以定义页面之间的跳转，我们最好将"链接"和"热区"工具调处来，方法是点击"视图 / 自定义工具栏"，然后把想要的工具拖到工具栏。

选中画板中的某个元素，点击工具栏上的"链接"，就可以指定跳转到哪一个画板了。然后就可以点击“预览”来查看跳转逻辑了，页面之间的转场动画也是可以设置的，在“原型 / 动画”中设置。

![原型连接线](./img/prototyping.png)

## 插件

### 插件管理器 - Sketch Toolbox

[Sketch Toolbox](http://sketchtoolbox.com/)，可以直接搜索安装插件。我用的时候经常奔溃，好在不常用忍了。

### 导出插件 - Sketch Measure

虽然有 Sketch Cloud 云，但是它是收费的。要队友没有 Sketch ，那只能导出 png 图片或 pdf 文件给他看，有一个好用的插件 - [Sketch Measure](http://utom.design/measure/)。Sketch 插件的安装也是比较随性，直接从官网下载压缩包解压，然后点击 .sketchplugin 文件秒装。使用方式: 插件 / Sketch Measure / 导出规范，选着要导出的页面就可以了。

### 图标插件 - Icon Font

[Icon Font](https://github.com/keremciu/sketch-iconfont)，图标插件。可以导入 svg 图标，自定义图标。

### 内容填充 - Craft

[Craft](https://www.invisionapp.com/craft)，可以直接从网站上扒图扒文字，填充到设计中。这个插件安装的时候略麻烦，需要先安装官方给的应用，安装后运行起来，再在系统的 menu bar 上找到它的图标，选择 Sketch 类型插件安装，最后你才能在插件中看到它。

![原型连接线](./img/craft.png)

很多好看的图片可以直接使用。

### 更多

更多工具推荐: https://cloud.tencent.com/developer/news/311543

在官方备过案的插件集合: https://www.sketch.com/extensions/plugins/

## 设计
