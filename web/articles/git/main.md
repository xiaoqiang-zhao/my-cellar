# Git 简易概念 与 简易操作手册

> 开源项目的协作利器，学这些开源项目可以从这里开始。

## Git 与 GitHub

Git有广义和狭义另种概念。
广义的Git指一款由Linus Torvalds开发的，诞生于2005年4月的，免费、开源的分布式版本控制系统，相当于svn。
狭义的Git是用“Git这套分布式版本控制系统”部署的一个平台，平台有一个网站，网址是`https://github.com/`，
是全球最大的Git系统（国内的开源中国也有自己的Git系统，但我们不将其简称为Git），Git也可以被企业或个人单独来部署管理私有代码。

GitHub，是一个网站，是一个社群，是一个代码托管平台（不一定是开源的）。
没有GitHub就Git（狭义的）就不会有如此规模，GitHub的主要作用就是展示开源项目，吸引越来越多的人进入到开源中，提供人与人人与项目之间的沟通桥梁。

GitHub是开源的圣地，但开源是靠不开源作为经济支撑的，因为不开源就要交代码托管费，这也是GitHub的运作模式。

## Git基础理念与概念

### Repository
直译为储藏室，国人一般称其为仓库，是存放代码的地方。
和我们平时说的项目相近，由于git是代码托管平台所以需要一个托管单位，`Repository`就是这样一个单位。
在github网站上`Repositories`是自己的仓库列表。

### fork
直译为分叉，没有较好的中文翻译，所以大家一般直接用。fork这个概念是git很重要的一个理念 -- 每人都可以做仓库的主人，是一种人人平等的理念。
每一个 `Repository` 中有人提需求有人补代码，大家用一种松散的方式推动仓库的建设。
为了避免控制权的争夺就提出了 `fork` 的概念。
比如两兄弟盖房子，在封顶的时候发生了分歧，老大要尖顶的，老二要圆顶的怎么办？
在现实世界中只能妥协或折中，但是在代码的世界里可以很好地解决这个问题，老二把房子`fork`出一份来，盖上圆顶，老大继续把原来的房子加上尖顶。
就这样两栋漂亮的房子同时存在，满足着兄弟两的爱好。（童话故事...）。
补充几点：
- 如果我们fork别人的项目，我们的`Repositories`中就会多出一个仓库来，这个仓库已经脱离了原来仓库的控制，可以向与原仓库不同的方向发展；
- 如果没有分歧不建议fork仓库，共建一个繁荣的仓库（实际上这时已经是一个社区了）不是一件很好的事情吗；
- fork出的项目可以发起`pull requests`，将修改推送给原始仓库；
- 强烈建议不要将fork当收藏用

### commit
提交，其实是本地提交，所以在没网的情况下也可以提交，所以提交之后仓库不会有反应。

### push
推送到仓库，推送的内容就是上面`commit`过的内容，一次`push`操作可以推送多个`commit`。如果当前处于分支，需要`merge` 到主干(`master`)才会在 `Contributions` 中有体现。

### pull
与`push`相反，将仓库中的代码拉到本地。

### branch
分支，多用于开发新功能，防止干扰主干代码，分支功能开发完成后`pull requests`主干。
主干默认为`master`。

### release
公开发行，可以为公开发行的版本打标签，方便回溯历史。

### tag
打标签，和在书本里加一个书签类似，常用来做里程碑。
另外公开发行的版本肯定是某次提交之后的代码，tag通常是打在某一次push上的，而这次push之后的代码作为一个可发性版本。

上面提到的操作可以用命令行实现也可以借助IDE或在GitHub网站上完成，
这方面已经有很完善的文档了，请参考下面资料，这里不再叙述。

[GitHub详细教程](http://blog.csdn.net/showhilllee/article/details/27706679)

## GitHub上的一些操作

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
- 4 如果不进行前三步操作，分支合并到主干时很可能因为冲突不能提交，另外在分支上开发建议先和主干Merge一下在开始开发

### 用WebStorm管理Git目录
有些情况下你可能用其他方式下载了Git项目的目录,用WebStorm打开发现没有Git选项,不能Commit.面对这种情况只需在VCS菜单下点击"Enable Version Control Integration..."在弹出框中选"Git",最后确定就可以了.

## 命令备忘

全部命令在[官方文档](https://git-scm.com/docs/)查到，这里翻译和记录一些常用命令。

### git clone

`git clone 项目地址`，克隆一个项目到本地。

### git status

`git status`，查看哪些文件被改变了，需要在被 git 托管的文件夹下使用。下面是几个一级标题对应的含义：
- Untracked files: 没有被托管的文件；
- Changes not staged for commit: 被托管了但是没有被添加到推送队列；
- Changes to be committed: 可被提交的文件，从上一个状态到这个状态需要下面的 `git add` 命令；
下面是 "Changes to be committed" 状态下文件的一些状态：
- modified: 修改的文件；
- new file: 新添加的文件;
- deleted: 删除文件
	
### git add
	
`git add dir/files`，添加托管文件，因为新建文件不会自动被 git 托管，所以需要手动添加

	// 添加全部文件
	git add .

### git rm
	
	// 移除托管文件
	git rm --cached 文件名

### git commit
	
	// 提交到本地的一个版本 ---- https://git-scm.com/docs/git-commit
	git commit -m "提交的描述信息"
	
	// 查看 commit日志
	git log
	
	// 插销 commit  --- 待研究，貌似不好使？
	git reset --hard commit_id
	
	// 提交
	git push origin/dev

### git branch 

`git branch -a` 列出全部分支，包括远程的本地的；

`git branch --track 本地分支名 origin/远程分支名`，分支追踪，[分支追踪](http://blog.csdn.net/hudashi/article/details/7664474)


## 移除被误提交的 IDE 配置文件

IDE 的配置文件通常是隐藏文件，不易在 IDE 中操作，这是需要命令行来辅助一下，下面是相关操作：

1、到达项目文件夹下，进入 IDE 的隐藏文件夹，这里以 WebStorm 为例，命令如下：

	cd .idea

2、删除文件：

	rm longze.iml modules.xml encodings.xml workspace.xml codeStyleSettings.xml

3、返回上层文件夹，并删除隐藏文件夹(如果文件夹中还有其他文件再从第一部开始将其删除)：

	cd ..
	rmdir .idea

4、Commit 全部文件的修改，(记得填写提交信息)：

	git commit -a -m "删除 IDE 的配置文件"

5、push 修改到服务器

	git push origin master

## 一个多人协作方式

git 提供了基本的功能，开发流程还需要根据人员和业务做定制，这里介绍一个常用的多人协作方式，以及用到的工具。

### 立项

新建项目分2种情况：

1.代码从零开始。
2.本地已经存在项目代码，只是想放到github上开源或者存放。

然而，无论是哪种情况，都得先在`github`新建一个项目的仓库。登录`github`后，找到`Repositories`这个Tab，然后点击`new`来新建一个项目仓库(更详细的介绍查看[这里](http://www.jianshu.com/p/df7ce9f3a5cb))。你本地还需要安装 git，这里也不详述，不了解的进[此传送门](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137396287703354d8c6c01c904c7d9ff056ae23da865a000/)。准备好这些就可以把代码克隆到本地了：

	// 在项目页面可以找到 git 的链接，如本博客的git链接如下
	// 一些企业的内部 git，或者国内的一些 git 站点也都有该功能，大同小异而已 
	https://github.com/longze/my-cellar.git
	// 然后克隆到本地
	git clone https://github.com/longze/my-cellar.git
	// 初始化此目录
	git init

这样你就可以开始写代码了，如果你是第二种情况直接将原来的代码拷贝到当前项目是最简单的方式。

这里给一条前端代码组织的参考意见：依赖的第三方包配置在 `package.json`，安装到本地当前项目根目录下的 `node_modules` 这个目录不建议提交；
再说一下`.gitignore`，一些不希望提交的文件可以写在此配置文件中，示例如下：

	# IDE的配置文件
    /.idea/
    .idea/codeStyleSettings.xml
    
    # npm日志
    npm-debug.log
    
    # node 依赖包
    node_modules/

首批文件准备好后就可以用下面的命令看看劳动成果了

	// 查看 git 的文件变动状态
	git status

如果没有多余的文件就可以提交了。这里有一个需要注意的地方，编辑器可能会生成一些隐藏文件不能在文件夹或 IDE 中直接被看到可能会被误提交，一般情况下 IDE 的配置文件是不需要提交的(因为我们的项目和 IDE 无关，参与者可以选择自己熟悉的工具来开发，多一个与项目无关的文件会使有洁癖的一些人很不爽)，如果有这类文件请在 `.gitignore` 文件中配置。

	// 将全部新文件添加到 git 托管中
	git add .
	// 如果有文件误添加到了 git 托管可以用下面命令撤销
	git rm --cached 文件名
	// 也可以单独添加一个文件或文件夹到 git 托管中
	git add 文件名
	
	// 提交
	git commit -m "提交的描述信息"
	git remote add origin https://github.com/longze/my-cellar.git
    git push -u origin master
	
### 创建开发分支(其实这里可以理解为开发时的主干)

首先，代码库应该有一个、且仅有一个主分支。所有提供给用户使用的正式版本，都在这个主分支上发布。

其次，需要一个开发分支，一般会命名为 `develop` 或简写为 `dev`这时需要创建一个远程分支：

	// 创建远程开发分支
	// 分支的内容来源是 master
	git checkout -b dev origin/master
	// 将分支推送到服务器
	git push origin dev

### 创建开发分支

git 起源于开源，所以有很重的极客Style，项目开发以一种松散的组织方式来进行，当有人提了Issue或者你自己觉得可以为项目添加某个新特性或者有兴趣修复 bug，那就从开发主干`dev(或develop)`迁出开发分支，然后在开发分支上编写代码。开发分支一般有三种类型：特性，修复 bug，预发布。新建开发分支的方法如下：

	// 创建远程特性分支
	git checkout -b origin/feature-x origin/dev
	// 创建远程修补 bug 分支
	git checkout -b origin/bug-x origin/dev
	// 创建远程预发布分支
	git checkout -b origin/release-x origin/dev
	
这里有两点需要说明：
1.怎么确定我要建的开发分支是远程还是本地？如果你想让别人知道你的开发进度或者当前的特性或bug修复需要多人协作完成，这时你需要的就是远程分支；否则新建本地就是你的选择，毕竟远程分支需要`push`到服务器(必须在有网的环境中，这又是一个限制)才能被其他开发者看到，另外开发完成还需要删除本地和远程的分支。
2.一个容易被忽略的地方，新建完远程分支后`push`到服务器才能被其他开发这看到。

	git push -u origin master
	// 将当前分支推送到远程分支 feature-test
	git push origin origin/feature-test

### 提交和推送代码

如果修改的文件全部都需要提交，可以使用下面命令：

	git commit -a -m " 测试特性分支提交"

如果只想提交部分文件用下面的组合命令：

	git add 文件名/文件夹名
	git commit -m "提交描述"

最后将代码推送到服务器：
	
	git push -u origin dev

### 同步远程代码

	git pull = git fetch + git merg

### 合并代码

	git checkout dev
    git merge feature-a
    
	// 取回origin主机的dev分支，与本地的feature-test分支合并
	git pull origin dev:feature-test
	
### 删除分支

当新特性或bug修复分支已经合并到开发分支，这个分支的生命就走到了尽头。删除分支这里提供几种方法：

- github官网: 如果你用的是 github，在网站上合并之后有一个操作项可以一键删除，但是错过了这个入口就回不来了。但是在项目的 `/branches` 目录下可以看到全部的分支，这里可以随便删除。但是不推荐这种方法，这种方法会引起“被删除的远程分支本地依然存在”，下面有原理介绍和解决方案。

- WebStorm: 可以在右下角的版本管理中直接删除。

- 用命令行: `git branch -d origin/分支名`

分支删除后本地状态需要重新检出，因为当前的本地分支和远程分支已经失去了对应关系。需要继续添加新功能或者修复回到上面。

### 一些诡异问题的解决方案

问题一：被删除的远程分支本地依然存在

如果远程分支被删除，在本地使用`git branch -a`依然存在，尝试了各种同步和删除命令都无法删除本地的这个分支，而这个分支原本就不应该存在，多方查找资料后得到两个方案：

编辑文件`.git/packed-refs`，如果看到有你关心的分支的名称，删除那一行；
在文件夹`.git/refs/heads`下查找你文件名与关心的分支名称有关的文件，如果找到了删除。

如果你有使用`SourceTree`这个辅助工具，直接删除远端的分支，虽然提示远程分支不存在(事实上确实也不存在)，但确定之后就成功了。

这个问题是因为 git 缺少对分支缓存文件的更新机制引起的，所以在本地使用命令行删除远程分支可以避免该问题。

### 其他

[分支追踪](http://blog.csdn.net/hudashi/article/details/7664474)
git branch --track experimental origin/experimental

## 其他

## 参考资料

[GitHub详细教程](http://blog.csdn.net/showhilllee/article/details/27706679)

[Sublime 下配置 GitHub](http://www.cnblogs.com/terrylin/archive/2013/04/04/2999465.html)

[Git分支管理策略](http://www.ruanyifeng.com/blog/2012/07/git.html)

[github-flow](http://scottchacon.com/2011/08/31/github-flow.html)

[创建 git 项目](http://www.jianshu.com/p/df7ce9f3a5cb)