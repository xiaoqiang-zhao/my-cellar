# Git(三) 命令备忘

> 可视化工具只是命令行的一个子集，可视化能做的命令行都能做，但是到目前为止还没有一个可视化工具实现了全部命令行，这里收集常用的命令，同时添加一些我的使用经验。

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
	// 提交全部更改和删除的文件
	git commit -a -m "提交的描述信息" 
	// 合并缓存区的修改和最近的一次commit, 然后用生成的新的commit替换掉老的. 
	// 如果缓存区没有内容, 那么利用amend可以修改上一次commit的描述.
	git commit --amend

开发过程中很容易忘记stage某个文件或填写了不够准确的commit描述. --amend就是用来fix这些错误的.

不要对一个公共的commit使用amend，amend后生成的commit是一个全新的commit, 之前的老的commit会从项目历史中被删除. 如果你amend了一个被其他开发者使用的commit, 会严重影响其他开发者。

另外你可能需要一些命令行的技巧：

    // 插入文字，你会发现默认是不让输入的
    i
    // 提交编辑后的文本
    esc
    :wq!

如果你想查看有几个 commit，可以用下面命令

    git log

撤销 commit 的命令如下：

    git reset --hard commit_id 
    
### git log	

	// 查看 commit日志
	git log

### git push
	
	// 将当前分支的修改推送到远程分支 dev
	git push -u origin dev
	// -u 分支是建立分支，以后就可以直接用下面命令了
	git push

### git branch 

`git branch` 列出本地分支；

`git branch -a` 列出全部分支，包括远程和本地分支；

`git branch --track 本地分支名 origin/远程分支名`，手动建立追踪，[资料传送门](http://blog.csdn.net/hudashi/article/details/7664474)。在 `push` 的时候可以指定 `-u` 参数来快速建立追踪，一般在分支第一次提交的时候加此参数，以后就可以直接 `git push` 了，不需要添加远程分支名。

`git branch -d 分知名` 删除本地分支；
`git branch -D 分知名` 经常是这个分支出问题了我们才删除，最常见的就是合并坏了需要重新 checkout(典型的警告提示 "deleting branch XXX that has been merged")，大写 D 强制删除；

`git branch -d origin/分知名` 删除远程分支；

有时候用上面的方法删除会报出"error: branch 'origin/branch_to_delete' not found."的错误，但是我们明明可以看到远程有那个分支，为什么要报找不到呢？这个可能是本地分支描述文件错误造成的，".git/refs/heads/origin/"下有所有分支的描述文件，一个简单除暴的办法就是当做一次 push，这样就不会走本地扫描这条路： `git push origin :branch_to_delete`。

造成错误的原因可能是已经向这个分支 commit 了，但是没有 push 或者 push 出错都会造成分支描述文件的改变，可以试试 "rm .git/refs/heads/branch_to_delete" -- 删除描述文件。

### git config

	// 获取配置信息
	git config --list
	// 设置用户名
	git config --global user.name "用户名"
	// 设置用户邮箱
	git config --global user.email "your.email@gmail.com"

除了配置和获取用户信息外，此命令可以配置命令的别名：

	// 如果配置了下面的别称
	git config --global alias.ci commit
	// 那么以后 commit 就可以向下面这样简写了
	git ci -m "提交描述"

### git checkout

`git checkout -b 本地分支名 origin/远程分知名`，将远程分支检出到本地作为新的本地分支，并且切换到新分支，参数 `-b` 指定是新建分支 `new branch` 而不是分只切换；
	
`git checkout 分知名` 切换本地分支；

可以用此命令删除远程分支：`git push origin :分支名`，git 没有提供删除本地分支的命令，这里可以通过删除文件的方式删除本地分支：`rm .git/refs/heads/本地分支名`。

HEAD 是 checkout 的灵魂。

### git fetch

`git fetch`，将远程分支列表映射到本地，主要的应用场景是别人新建了远程分支但是我们本地无法看到，执行该命令可以将远程的分支映射到本地方便检出。如果只想映射某一个分支(这个分支的名称当然需要其他人告诉你)，可以使用下面命令：
	
    git fetch origin 远程分知名:本地分支名
    // 如果只想获取远程分支映射而不想检出到本地，可用下面简写
    git fetch origin 远程分知名

此命令不仅将远程映射到本地，还会检出一份代码作为本地分支，本地分知名在冒号后面指定。

### git merge

将其他分支的代码合并到当前所在分支，

	// 合并远程分支代码
	git merge origin/feature/z
	// 合并本地分支代码
	git merge feature/z

这里需要注意一点，被合并的远程分支需要先将改动映射到本地 `git fetch origin 远程分知名`，否则不能拿到最新修改。这个`fetch`命令的优势是可以不检出本地分支，更不需要切换到被合并分支的本地分支。另外 `fetch` 不改变本地代码，但是已经将修改同步到了本地仓库，这个便捷来自于 git 的差异更新机制。

### git pull

拉取远程分支并合并到当前分支

	git pull origin dev

如果已经建立了跟踪可以如下简写：

	git pull

## 参考资料

[官方文档](https://git-scm.com/docs/)

[GitHub详细教程](http://blog.csdn.net/showhilllee/article/details/27706679)

[Sublime 下配置 GitHub](http://www.cnblogs.com/terrylin/archive/2013/04/04/2999465.html)

[Git分支管理策略](http://www.ruanyifeng.com/blog/2012/07/git.html)

[github-flow](http://scottchacon.com/2011/08/31/github-flow.html)

[创建 git 项目](http://www.jianshu.com/p/df7ce9f3a5cb)

[git checkout 命令详解](http://www.tuicool.com/articles/A3Mn6f)