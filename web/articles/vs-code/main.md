# Visual Studio Code 使用笔记

> Visual Studio Code 大有后来居上超过 WebStrom 的趋势，他的插件卡法方式实在太吸引人了。总的来说 vs 还 没有 ws 功能强大，但是很快这些确实的功能会补上。

## 设置

vs 的配置分3个级别，分别是默认配置、用户设置和工作区设置，优先级也依次递增。

    // 编辑区字体
    "editor.fontSize": 16,

    // 在新窗口打开文件夹
    "window.openFoldersInNewWindow": "on"

左侧资源管理器的字体没找到调节的办法，window.zoomLevel 是整体放缩不是我想要的效果。

皮肤切换：Code/首选项/颜色主题 (Cmd + T + K)

## 快捷键

快捷键的查看和设置：Code/首选项/键盘快捷方式 (Cmd + K + S)。

对于快捷键的设置，特殊案件的顺序是：Shift -> Ctr -> Alt -> Cmd -> page(按键L型)，这样便于搜索。

### 基本

上/下移动一行：Alt + 上/下箭头

向上/下复制一行：Shift + Alt + 上/下箭头

删除一行：Shift + Cmd + K

剪切一行：Cmd + X

切换编辑窗口：Alt + Cmd + Pageleft/Pageright

查找：Cmd + F

查找替换：Cmd + Alt + F，在当前文件查找

### 效率

关闭其他Tab：Alt + Cmd + T

新建文件：Cmd + N，吐槽一下默认居然在项目的根目录新建文件，多数情况下还是希望在当前选中目录下新建文件，所以我们自定义一下：

    {
        "key": "cmd+n",
        "command": "explorer.newFile"
    }

新建文件夹：Cmd + Shift + N，这个快捷键并没有原始提供，需要加配置：

    {
        "key": "shift+cmd+n",
        "command": "explorer.newFolder"
    }

折叠代码：Alt + Cmd + [

在当前编辑器打开文件：Cmd + P

复制文件路径：

## Git 相关

点击左侧 Git 图标/更多/切换源代码管理系统.../安装其他SCM提供程序...，然后在插件系统中可以安装好用的 Visual Studio Team Services 插件，然后就可以轻松查看修改过的内容了。

commit 比较方便，写完 message 按 Cmd + Enter 就直接提交了；

唤出命令行：Shift + Cmd + C，不是唤出 VS Code 自带的工具，而是打开系统自带的命令行工具。

## 杂项

如果用了 `vetur` 插件可能会出一个这样的警告：

    'v-for' directives require 'v-bind:key' directives.
    
这是ESLint的功能。对vue进行了eslint检查。那么我们就把eslint对该插件的检查关闭，在配置文件中添加如下配置：

    "vetur.validation.template": false

## 插件

emmet 语法插件 Mithril Emmet support for VS Code，添加配置：

    "emmet.syntaxProfiles": {
        "vue-html": "html",
        "vue": "html"
    }
