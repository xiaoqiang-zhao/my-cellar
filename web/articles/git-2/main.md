# Git(二) GitHub网站和WebStorm上的一些操作

> 如果你不想敲命令，使用 IDE 和 GitHub 网站也能完成大部分操作。

## GitHub网站上的一些操作

### 个人主页
登录GitHub后点右上角用户头像下拉框中的 “Your profile” 到个人主页。

### Repository
仓库在个人主页下，有一个名为 `repositories` 的tab页，此tab页下是当前账户下所有仓库的列表。
当前账户自建的仓库和从别人那里fork出的仓库都可以在这里找到。

### branch
从上面 `repositories` 的列表可进入任一仓库，从当前仓库下的 `branches` 链接可进入分支管理页，
可以在此处删除分支，或者将分支合并回主干。

### releases
公开发行的版本列表，
删除某一发行版本可点击标题，在进入的页面中有删除按钮。

### 分支向主干推送内容
切换到分支，右边有一个"弯曲箭头和竖线"的图标(文字标示为"Pull requests")，点击此图标可将分之内容合并到主干。一般的开发流程都不建议直接在主干上修改。在分支开发、测试、review，所有的都没问题了再合并回主干，主干代码永远保持稳定版。

### 主干向分支推送更改内容
主干向分支推送更改内容很容易造成内容冲突，所以如果想这样逆向而行最好先和开发成员打个招呼。方式是在项目页面左边有一个"绿色两个歪箭头按钮"，点击之后到 "Comparing changes" 页面进行推送,多个分支需要推送多次.

### 邀请别人和你一起开发一个项目
当两个人合作开发一个项目的时候，每次提交代码走 Pull Requests 流程会比较麻烦，这时你可以邀请别人加入项目，具体流程：打开项目的 Settings/Collaborators，然后输入被邀请人的用户名，再然后系统会生成一个邀请链接，发送个你的 Partner，他通过就能无阻碍的提交代码了。

## WebStorm 技巧备忘

### 从git上拿项目
工具栏VCS/Checkout/Git，
填写git的地址仓库地址、本地路径、本地项目名称就可以将git上的仓库克隆到本地了。

### 更新分支
右击项目文件，git/repository/pull 从git上获取新的分支信息。

### 切换分支
右下角有编码和Git的版本信息，点击右下角的版本信息上下箭头会出现Git Branches列表，
其中Remote Branches就是Git上的分支列表，
在展开下一级菜单中有Checkout，Compare，Merge，Delete。

### 提交
右击要提交的文件夹，Git/Commit Directory/，填写Commit Message进行提交，也可以提交并推送。
单个文件提交同理。WebStorm 快捷方式 Com + K。

### 推送
右击要提交的文件夹，Git/Repository/Push，选择之前提交过的进行推送。WebStorm快捷方式 Com + Shift + K。

### 主干修改后怎么同步到分支
如果有紧急修复的bug，需要直接在主干修改(新拉一个分支再合并回主干也是一样的)，那么怎么同步到分支呢？
- 1 在点击 Git/Repository/Pull 弹出的对话框中选中所有分支(包括主干)进行更新操作
- 2 在分支上点击右下角的分支控制按钮，找到主干点击后在二级弹窗中点击 Merge
- 3 最后再 Git/Repository/Push 一次，将Merge结果同步到线上分支，这样主干和分支就回到了正常的状态
- 4 如果不进行前三步操作，分支合并到主干时很可能因为冲突不能提交，另外在分支上开发建议先和主干Merge一下再开始开发

### 用WebStorm管理Git目录
有些情况下你可能用其他方式下载了Git项目的目录,用WebStorm打开发现没有Git选项,不能Commit.面对这种情况只需在VCS菜单下点击"Enable Version Control Integration..."在弹出框中选"Git",最后确定就可以了.

## 参考资料

[GitHub详细教程](http://blog.csdn.net/showhilllee/article/details/27706679)

[Sublime 下配置 GitHub](http://www.cnblogs.com/terrylin/archive/2013/04/04/2999465.html)

[Git分支管理策略](http://www.ruanyifeng.com/blog/2012/07/git.html)

[github-flow](http://scottchacon.com/2011/08/31/github-flow.html)

[创建 git 项目](http://www.jianshu.com/p/df7ce9f3a5cb)