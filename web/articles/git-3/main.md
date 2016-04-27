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

### git log	

	// 查看 commit日志
	git log

### git reset
	
	// 插销 commit  --- 待研究，貌似不好使？
	git reset --hard commit_id

### git push
	
	// 将当前分支的修改推送到远程分支 dev
	git push origin dev

### git branch 

`git branch -a` 列出全部分支，包括远程的本地的；

`git branch --track 本地分支名 origin/远程分支名`，手动建立追踪，[资料传送门](http://blog.csdn.net/hudashi/article/details/7664474)。在 `push` 的时候可以指定 `-u` 参数来快速建立追踪，一般在分支第一次提交的时候加此参数，以后就可以直接 `git push` 了，不需要添加远程分支名。

### git config

	// 获取配置信息
	git config --list
	// 设置用户名
	git config --global user.name "用户名"
	// 设置用户邮箱
	git config --global user.email "your.email@gmail.com"

## 参考资料

[官方文档](https://git-scm.com/docs/)

[GitHub详细教程](http://blog.csdn.net/showhilllee/article/details/27706679)

[Sublime 下配置 GitHub](http://www.cnblogs.com/terrylin/archive/2013/04/04/2999465.html)

[Git分支管理策略](http://www.ruanyifeng.com/blog/2012/07/git.html)

[github-flow](http://scottchacon.com/2011/08/31/github-flow.html)

[创建 git 项目](http://www.jianshu.com/p/df7ce9f3a5cb)