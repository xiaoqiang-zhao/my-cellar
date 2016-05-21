# Git(四) 一个多人协作方式

> Git 提供了基本的功能，开发流程还需要根据人员和业务做定制，这里介绍一个常用的多人协作方式，以及用到的工具。最后列出一些经常遇到的问题和对应的解决方案。

## 立项

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

如果没有多余的文件就可以提交了。这里有一个需要注意的地方，编辑器可能会生成一些隐藏文件不能在文件夹或 IDE 中直接被看到可能会被误提交，一般情况下 IDE 的配置文件是不需要提交的(因为我们的项目和 IDE 无关，参与者可以选择自己熟悉的工具来开发，多一个与项目无关的文件会使有洁癖的一些人很不爽)，如果有这类文件请在 `.gitignore` 文件中配置。提交步骤如下：

	// 将全部新文件添加到 git 托管中
	git add .
	// 如果有文件误添加到了 git 托管可以用下面命令撤销
	git rm --cached 文件名
	// 也可以单独添加一个文件或文件夹到 git 托管中
	git add 文件名
	
	// 提交
	git commit -m "提交的描述信息"
	// 添加远程仓库，忘了不添加会有什么问题，下次用的时候记录一下
	git remote add origin https://github.com/longze/git-test.git
	// 推送
    git push -u origin master
	
## 创建开发分支(其实这里可以理解为开发时的主干)

首先，代码库应该有一个、且仅有一个主分支。所有提供给用户使用的正式版本，都在这个主分支上发布。

其次，需要一个开发分支，一般会命名为 `develop` 或简写为 `dev`这时需要创建一个远程分支：

	// 创建远程开发分支
	// 分支的内容来源是 master
	git checkout -b dev origin/master
	// 将分支推送到服务器
	git push origin dev

## 创建开发分支

git 起源于开源，所以有很重的极客Style，项目开发以一种松散的组织方式来进行，当有人提了Issue或者你自己觉得可以为项目添加某个新特性或者有兴趣修复 bug，那就从开发主干`dev(或develop)`迁出开发分支，然后在开发分支上编写代码。开发分支一般有三种类型：特性，修复 bug，预发布。新建开发分支的方法如下：

	// 创建特性分支   【分知名】 【衍生分支原】
	git checkout -b feature/x origin/dev
	// 创建修补 bug 分支
	git checkout -b bug/x origin/dev
	// 创建预发布分支
	git checkout -b release/x origin/dev
	// 注：有 release/x 和 release-x 两种形式，
	//    前一种多一些可视化工具支持比较好，后一种命名更清楚
	
这里有两点需要说明：
1.怎么确定我要建的开发分支是远程还是本地？如果你想让别人知道你的开发进度或者当前的特性或bug修复需要多人协作完成，这时你需要的就是远程分支；否则新建本地就是你的选择，毕竟远程分支需要`push`到服务器(必须在有网的环境中，这又是一个限制)才能被其他开发者看到，另外开发完成还需要删除本地和远程的分支。
2.一个容易被忽略的地方，新建完远程分支后`push`到服务器才能被其他开发这看到。

	// 将当前分支推送到远程分支 feature/x
    git push -u origin feature/x
    // 第一次推送，指定追踪(解释参见 git branch --track)，方便以后使用 git push

## 和别人在同一分支开发

如果别人建立了特性分支，在本地使用 `git branch -a` 无法看到也无法直接检出，这时需要使用下面命令：

	git fetch

就可以将远程新建的分支映射到本地，然后检出才可以进行开发。
	
## 提交和推送代码

到这一步终于可以写代码了，但这不是我们的重点，轻轻飘过，现在假设你已经完成了此特性的开发。

如果修改的文件全部都需要提交，可以使用下面命令：

	git commit -a -m " 测试特性分支提交"

如果只想提交部分文件用下面的组合命令：

	git add 文件名/文件夹名
	git commit -m "提交描述"

另外需要注意的一点是新添加的文件默认不会被添加到托管中，需要使用 `git add 文件名/文件夹名` 命令手动添加，如果文件较多可以使用 `git add .` 命令，如果有些文件不想此次提交可用 `git rm --cached 文件名` 命令来移除。

最后将代码推送到服务器：
	
	git push -u origin feature/x
	// 如果指定了追踪可以向下面这样简写，不用指定远程分支名
	git push

如果多人共同完成一个 `feature` 那推送到远程服务器就有必要了，如果是一个人一天的工作直接将代码合并到 `dev` 分支进行推送。个人建议先推送一次，这样合并代码的时候就可以放心的瞎搞了，尤其是使用 git 还不是很熟练的时候。还有一种场景需要推送，就是需要代码审核，你开发完成后将代码推送到服务器，然后发起 `pull request`。

关于 `pull request` 的接受和拒绝待验证待续([参考资料](http://blog.jobbole.com/76854/))...

## 同步远程代码

	// 如果本地还没有 dev 分支需要先检出
	git checkout -b dev origin/dev
	// 如果已近存在需要拉去一下最新代码，git pull = git fetch + git merge
	git pull

建议每天开始写新代码之前在 `merge` 一下 `dev` 分支的代码

## 合并代码

	// 将特性分支合并到 dev 分支
    git merge feature/x
    // 如果以前建立过追踪可用下面简写
	git push
	// 如果没有建立过追踪可用下面命令，推送并建立追踪
	git push -u origin dev

如果新特性已经开发完成可以进入下面一步删除分支，如果还要继续开发，切回到特性分支 `git checkout feature/x` 然后回到“提交和推送代码”这一步。
	
## 删除分支

当新特性或bug修复分支已经合并到开发分支，这个分支的生命就走到了尽头。删除分支这里提供几种方法：

- github官网: 如果你用的是 github，在网站上合并之后有一个操作项可以一键删除，但是错过了这个入口就回不来了。但是在项目的 `/branches` 目录下可以看到全部的分支，这里可以随便删除。但是不推荐这种方法，这种方法会引起“被删除的远程分支本地依然存在”，下面有原理介绍和解决方案。
- WebStorm: 可以在右下角的版本管理中直接删除。
- 用命令行: `git push origin :分支名`
- SourceTree 中可视化删除

分支删除后本地状态需要重新检出，因为当前的本地分支和远程分支已经失去了对应关系。需要继续添加新功能或者修复回到上面。

## 一些常见问题的解决方案

### 被删除的远程分支本地依然存在

如果远程分支被删除，在本地使用`git branch -a`依然存在，尝试了各种同步和删除命令都无法删除本地的这个分支，而这个分支原本就不应该存在，多方查找资料后得到两个方案：

在文件夹`.git/refs/heads`下查找你文件名与关心的分支名称有关的文件，如果找到了删除。
对应的命令行 `rm .git/refs/heads/本地分支名`

如果你有使用`SourceTree`这个辅助工具，直接删除远端的分支，虽然提示远程分支不存在(事实上确实也不存在)，但确定之后就成功了。

这个问题是因为 git 缺少对分支缓存文件的更新机制引起的，所以在本地使用命令行删除远程分支可以避免该问题。

### 移除被误提交的 IDE 配置文件

IDE 的配置文件通常是隐藏文件，不易直接可视化操作，这是需要命令行来辅助一下，下面是相关操作：

1、到达项目文件夹下，进入 IDE 的隐藏文件夹，这里以 WebStorm 为例，命令如下：

	cd .idea

2、删除文件：

	rm longze.iml modules.xml encodings.xml workspace.xml codeStyleSettings.xml

3、返回上层文件夹，并删除隐藏文件夹(如果文件夹中还有其他文件再从第一部开始将其删除)：

	cd ..
	rmdir .idea

4、Commit 全部文件的修改，(记得填写提交信息)：

	git commit -a -m "删除 IDE 的配置文件"

5、为了永绝后患在 `.gitignore` 中添加或略配置；

6、push 修改到服务器

	git push origin master

### 解决冲突

对于同一个文件如果本地有修改远程文件也有修改就可能在提交时产生冲突。如果有冲突，`merge`的时候需要先将本地代码提交以防止被覆盖丢失，然后 `merge` 就会将冲突显示出来，可能向下面：

	<<<<<<< HEAD
    var a = 'a.js' + '1';
    // dev 上的修改
    // dev 上的修改2
    =======
    var a = 'a.js' + '2';
    // feature/x 修改测试2
    // 我改1
    // 我改2
    >>>>>>> feature/x

然后手动合并，最总结过可能是这样：

	var a = 'a.js' + '2';
	// dev 上的修改
	// dev 上的修改2
	// feature/x 修改测试2
	// 我改1
	// 我改2

然后就可以进行提交和推送操作了。

## 参考资料

[GitHub详细教程](http://blog.csdn.net/showhilllee/article/details/27706679)

[Sublime 下配置 GitHub](http://www.cnblogs.com/terrylin/archive/2013/04/04/2999465.html)

[Git分支管理策略](http://www.ruanyifeng.com/blog/2012/07/git.html)

[github-flow](http://scottchacon.com/2011/08/31/github-flow.html)

[创建 git 项目](http://www.jianshu.com/p/df7ce9f3a5cb)