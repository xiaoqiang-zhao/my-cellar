# Git 使用备忘

> 可视化工具只是命令行的一个子集，可视化能做的命令行都能做，但是到目前为止还没有一个可视化工具实现了全部命令行，这里收集常用的命令，同时添加一些我的使用经验。

## 安装

`yum install -y git`

## git clone

`git clone 项目地址`，克隆一个项目到本地。

## git status

`git status`，查看哪些文件被改变了，需要在被 git 托管的文件夹下使用。下面是几个一级标题对应的含义：

- Untracked files: 没有被托管的文件；
- Changes not staged for commit: 被托管了但是没有被添加到推送队列；
- Changes to be committed: 可被提交的文件，从上一个状态到这个状态需要下面的 `git add` 命令；
下面是 "Changes to be committed" 状态下文件的一些状态：
- modified: 修改的文件；
- new file: 新添加的文件;
- deleted: 删除文件

## git add
	
`git add dir/files`，添加托管文件，因为新建文件不会自动被 git 托管，所以需要手动添加

```shell
// 添加全部文件
git add .
```

## git rm

```shell
// 移除托管文件
git rm --cached 文件名
```

## git commit

```shell
// 提交到本地的一个版本 ---- https://git-scm.com/docs/git-commit
git commit -m "提交的描述信息"
// 提交对文件的全部更改和删除
git commit -a -m "提交的描述信息" 
// 合并缓存区的修改和最近的一次 commit, 然后用生成的新的 commit 替换掉老的. 
// 如果缓存区没有内容, 那么利用 amend 可以修改上一次 commit 的描述.
git commit --amend -m "新 commit 描述"
```

开发过程中很容易忘记 stage 某个文件或填写了不够准确的 commit 描述. --amend 就是用来 fix 这些错误的.

不要对一个公共的 commit 使用 amend，amend 后生成的 commit 是一个全新的 commit, 之前的老的 commit 会从项目历史中被删除. 如果你 amend 了一个被其他开发者使用的 commit, 可能会使其他开发者感到困惑。

查看 commit 历史列表:

```shell
git log
```

## git reset

如果你误 commit 了某一部分文件，还没有 push 到远程，那么你可以用 `git log` 找到 commit 的 commit_id，然后回滚到上一个 commit 之后的那一点，加 --hard 参数后未被 commit 的内容将被抛弃并不能被找回：

```shell
git reset --hard commit_id
```

如果已经提交到了远程建议不要尝试各种撤销，建议提交一个新版本修正所犯错误。

如果你想放弃未 commit 的修改，可以用 checkout:

```shell
git reset --soft HEAD^
```

有时候我们要在服务器上临时改一写东西做验证，最后不想提交，这时可以用 `git checkout` 命令来撤销未 commit 的文件。

```shell
git checkout .            # 撤销对所有已修改但未提交的文件的修改，但不包括新增的文件
git checkout [filename]   # 撤销对指定文件的修改，[filename]为文件名
```

## git log

```shell
// 查看 commit日志
git log
```

## git push

```shell
// 将当前分支的修改推送到远程分支 dev
git push -u origin dev
// -u 是建立分支追踪，以后就可以直接用下面命令了，而不需要指定要 push 哪个分支
git push
// 删除远程分支
git push origin :branch_name_to_delete
```

## git branch 

`git branch` 列出本地分支；

`git branch -a` 列出全部分支，包括远程和本地分支；

`git branch --track 本地分支名 origin/远程分支名`，手动建立追踪，[资料传送门](http://blog.csdn.net/hudashi/article/details/7664474)。在 `push` 的时候可以指定 `-u` 参数来快速建立追踪，一般在分支第一次提交的时候加此参数，以后就可以直接 `git push` 了，不需要添加远程分支名。

`git branch -d 分知名` 删除本地分支；
`git branch -D 分知名` 经常是这个分支出问题了我们才删除，最常见的就是合并坏了需要重新 checkout(典型的警告提示 "deleting branch XXX that has been merged")，大写 D 强制删除；

`git branch -d origin/分知名` 删除远程分支；

有时候用上面的方法删除会报出 "error: branch 'origin/branch_to_delete' not found." 的错误，但是我们明明可以看到远程有那个分支，为什么要报找不到呢？这个可能是本地分支描述文件错误造成的，".git/refs/heads/origin/"下有所有分支的描述文件，一个简单粗暴的办法就是当做一次 push，这样就不会走本地扫描这条路了，命令： `git push origin :分支名`。

造成错误的原因可能是已经向这个分支 commit 了，但是没有 push 或者 push 出错都会造成分支描述文件的改变，可以试试 "rm .git/refs/heads/分支名" -- 删除描述文件。

有时远程分支明明已经没有了可是在本地 `git branch -a` 的时候还能看到，这是怎么回事？
因为 .git/refs/remotes/origin 文件夹下有缓存文件，手动删除一下就可以。还有一个地方可能有缓存 .git/packed-ref 文件中。

## git config

```shell
// 获取配置信息
git config --list
// 设置用户名
git config --global user.name "用户名"
// 设置用户邮箱
git config --global user.email "your.email@gmail.com"
```

除了配置和获取用户信息外，此命令可以配置命令的别名：

```shell
// 如果配置了下面的别称
git config --global alias.ci commit
// 那么以后 commit 就可以向下面这样简写了
git ci -m "提交描述"
```

## git checkout

`git checkout -b 本地分支名 origin/远程分知名`，将远程分支检出到本地作为新的本地分支，并且切换到新分支，参数 `-b` 指定是新建分支 `new branch` 而不是分只切换；

`git checkout 分知名` 切换本地分支；

可以用此命令删除远程分支：`git push origin :分支名`，git 没有提供删除本地分支的命令，这里可以通过删除文件的方式删除本地分支：`rm .git/refs/heads/本地分支名`。

HEAD 是 checkout 的灵魂。

## git fetch

`git fetch`，将远程分支列表映射到本地，主要的应用场景是别人新建了远程分支但是我们本地无法看到，执行该命令可以将远程的分支映射到本地方便检出。如果只想映射某一个分支(这个分支的名称当然需要其他人告诉你)，可以使用下面命令：

```shell
git fetch origin 远程分知名:本地分支名
// 如果只想获取远程分支映射而不想检出到本地，可用下面简写
git fetch origin 远程分知名
```

此命令不仅将远程映射到本地，还会检出一份代码作为本地分支，本地分知名在冒号后面指定。

远程分支删除后用 `git branch -a` 还能看到被删除的分支，这是因为 git 的缓存机制，可以用下面命令删除远程已经不存在但本地却还有缓存的分支。

```shell
git fetch -p
```

## git merge

将其他分支的代码合并到当前所在分支，

```shell
// 合并远程分支代码
git merge origin/feature/z
// 合并本地分支代码
git merge feature/z
```

这里需要注意一点，被合并的远程分支需要先将改动映射到本地 `git fetch origin 远程分知名`，否则不能拿到最新修改。这个`fetch`命令的优势是可以不检出本地分支，更不需要切换到被合并分支的本地分支。另外 `fetch` 不改变本地代码，但是已经将修改同步到了本地仓库，这个便捷来自于 git 的差异更新机制。

## git pull

拉取远程分支并合并到当前分支

```shell
git pull origin dev
```

如果已经建立了跟踪可以如下简写：

```shell
git pull
```

## gitflow

在了解了基本的使用命令后，你还需要了解一个多人协作的方式: gitflow。

学习传送门:
- [英文](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [中文](https://www.cnblogs.com/wish123/p/9785101.html)

## 加速

向 github 提交代码与拉去代码越来越慢了，配一下 hosts 加速 DNS 解析速度会有些许提速。

首先用 [DNS查询工具](https://tool.chinaz.com/dns/?type=1&host=assets-cdn.github.com&ip=) 查找下面两个链接的 DNS，然后选TTL 最小的。hosts 配置如下:

```
151.101.109.194 github.global.ssl.fastly.net
185.199.111.153 assets-cdn.github.com
```

## 坑 记

Git 默认不区分文件名大小写真是一个大坑。

```shell
git config core.ignorecase false
```

## 参考资料

[官方文档](https://git-scm.com/docs/)

[GitHub详细教程](http://blog.csdn.net/showhilllee/article/details/27706679)

[Sublime 下配置 GitHub](http://www.cnblogs.com/terrylin/archive/2013/04/04/2999465.html)

[Git分支管理策略](http://www.ruanyifeng.com/blog/2012/07/git.html)

[github-flow](http://scottchacon.com/2011/08/31/github-flow.html)

[创建 git 项目](http://www.jianshu.com/p/df7ce9f3a5cb)

[git checkout 命令详解](http://www.tuicool.com/articles/A3Mn6f)

全部命令在[官方文档](https://git-scm.com/docs/)查到，这里翻译和记录一些常用命令。

[如何优雅地使用 Git](https://www.zhihu.com/question/20866683/answer/720671116)

[30分钟学会 Git 命令](https://zhuanlan.zhihu.com/p/69047436)
