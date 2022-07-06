# VS Code 使用笔记

> 介绍 VS Code 的配置和好用插件。

## 设置

vs 的配置分3个级别，分别是默认配置、用户设置(User)和工作区设置(Workspace)，优先级也依次递增。用户设置作用于所有打开的窗口，适合设置统一的快捷方式等。工作区设置只作用于当前项目，如果不同的项目需要用不同的代码格式，那么代码格式设置和检查在当前项设置。

```config
// 编辑区字体
Text Editor/Font/FontSize: 16,

// 整体大小调整
Window/Zoom Level: 0.5

// 在新窗口打开文件夹
Window/openFoldersInNewWindow: on

// 缩进
Tab Size: 4
```

皮肤切换：Code/Preferences/Color Theme (Cmd + K + T)

## 快捷键

快捷键的查看和设置：Code/Preferences/Keyboard Sortcuts (Cmd + K + S)。

对于快捷键的设置，特殊案件的顺序是：Shift -> Ctr -> Alt -> Cmd -> page(按键L型)，这样便于搜索。

### 基本

上/下移动一行：Alt + 上/下箭头

向上/下复制一行：Shift + Alt + 上/下箭头

删除一行：Shift + Cmd + K

剪切一行：Cmd + X

切换编辑窗口：Alt + Cmd + Left/Right

查找：Cmd + F

查找替换：Cmd + Alt + F，在当前文件查找

Cmd = ⌘
Alt = ⌥
Shift = ⇧
Ctr = ⌃

### 效率

关闭其他Tab：Alt + Cmd + T

新建文件：Cmd + N，吐槽一下默认居然在项目的根目录新建文件，多数情况下还是希望在当前选中目录下新建文件，所以我们自定义一下：

```config
{
    "key": "cmd+n",
    "command": "explorer.newFile"
}
```

新建文件夹：Cmd + Shift + N，这个快捷键并没有原始提供，需要加配置：

```config
{
    "key": "shift+cmd+n",
    "command": "explorer.newFolder"
}
```

折叠代码：option + Cmd + [

在当前编辑器打开文件：Cmd + P

### 功能

格式化代码：Shift + Alt + F

## Git 相关

点击左侧 Git 图标/更多/切换源代码管理系统.../安装其他SCM提供程序...，然后在插件系统中可以安装好用的 Visual Studio Team Services 插件，然后就可以轻松查看修改过的内容了。

commit 比较方便，写完 message 按 Cmd + Enter 就直接提交了；

唤出命令行：Shift + Cmd + C，不是唤出 VS Code 自带的工具，而是打开系统自带的命令行工具。

## 命令行相关

唤起命令行区域(Toggle Integrated Terminal)：Ctrl + `，唤起状态下同样的快捷键可以收起命令行区域。

新建一个命令行区域(Create New Integrated Terminal)：Ctrl + Shift + `。

切换到下一个命令行(Focus Next Terminal)：Ctrl + N，此快捷键没有被原生定义，需要手动添加。

切换到上一个命令行(Focus Previous Terminal)：Ctrl + P，此快捷键没有被原生定义，需要手动添加。

## 插件

### emmet

emmet 语法插件 Mithril Emmet support for VS Code，添加配置：

```config
"emmet.syntaxProfiles": {
    "vue-html": "html",
    "vue": "html"
}
```

beautify 格式化代码插件

https://hao5743.github.io/2016/12/26/vscode%E4%B8%ADbeautifyrc%E6%8F%92%E4%BB%B6%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E7%BF%BB%E8%AF%91%E5%92%8C%E8%AE%BE%E7%BD%AE/

### Auto Rename Tag

[Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) 修改HTML标签时，自动修改匹配的标签

### Markdown Table Formatter

| Prop       | Data Type | Options    | Default | Description   |
|------------|-----------|------------|---------|---------------|
| isShowLogo | boolean   | true/false | true    | 是否展示logo  |
| username   | string    | -          | null    | 用户名/手机号 |
| menuItems  | Array     | -          | null    | 导航数据      |

非常好用的插件，强迫症的福音，把表格对的整整齐齐的。但是中文比较尴尬，解决办法就是把中文放在最后一列，看着会好点。

这个插件移动列的快捷方式默认是 Option + Command + Left/Right，这和切换 Tab 的快捷方式冲突了，建议调整成 Control + Option + Left/Right。

一般的用法是选中表格区域，右键/Format Document With.../Markdown Table Formatter。高频用法是把 md 文件的默认格式化工具设置成 Markdown Table Formatter，然后就不需要选择了，直接快捷键: Option + Shift + F。

### FECS

先安装插件 vscode-fecs-plugin，然后全局安装 fecs

```shell
npm install -g fecs
```

配置 $NODE_PATH 环境变量

```shell
// 获取全局 npm 包安装路径
npm root -g
vi ~/.bash_profile
// 配置如下，路径可能不同
// export NODE_PATH=/usr/local/lib/node_modules
```

然后重启 VS Code，是彻底退出，是彻底退出，是彻底退出，不是只重启当前项目。

如果有的项目采用了不同的编码规范，可以找到插件然后 disable workspace，就可以在此项目中禁用 FECS 的代码格式检测。

参考：https://github.com/l5oo00/vscode-fecs-plugin/issues/4#issuecomment-312411535

## 杂项

如果用了 `vetur` 插件可能会出一个这样的警告：

`'v-for' directives require 'v-bind:key' directives.`
    
这是ESLint的功能。对vue进行了eslint检查。那么我们就把eslint对该插件的检查关闭，在配置文件中添加如下配置：

`"vetur.validation.template": false`

某些项目左侧的 git 图标在修改了文件后依然没啥动静，这是需要点击图标，然后点击三个点，在下拉中点“切换源代码管理系统”，最后选 Git，问题就解决了。

ESLint: http://www.cnblogs.com/rubylouvre/p/7280219.html

在新窗口打开项目而不关闭当前窗口的设置: 文件 / 首选项 / 设置 / 窗口 / 新建窗口 / Open Folders In New Window / on
