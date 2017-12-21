# Linux 备忘笔记

> 前端很多人都不是计算机相关专业的科班出生，但是前端的环境越来越复杂，好多人脚手架出了问题无从下手查，需要部署服务器还需要后端帮忙，把工作中用到的一些技巧做整理，方便自查。

## Shell 概述

鸟哥说“如果想要更深入的学习 Linux 的话，那么命令行模式才是不二的学习方式”，但是终端、命令行、shell、bash 是什么关系一直傻傻的理不清楚。

先说终端，这是个比较早的概念，在微软推出个人电脑前计算机比较昂贵，模式是一台中央计算机，连出几套显示器和键盘，最初把这一套套的显示器和键盘叫终端，后台有了专门的链接设备。再后来两边都在升级，中央电脑这边升级成了服务器集群(谷歌亚马逊)，终端这边升级为个人电脑，所以广义上讲所有连接了显示器和键盘以及可以链接其他计算机的计算机就是终端，但是随着时代的发展词还是原来的那个词(终端 Terminal)，意思却升级成了计算机上某种特定的软件，这种软件的交互方式是命令行，所以我们平时“说打开终端，在终端中输入什么” 就是“打开命令行工具，在命令行工具中输入什么”。还有一点意思上的升级，原来的终端指操控其他计算机的一种机器，现在的终端不仅指操作远程计算机也指操作当前计算机(终端本身)。

然后是 shell，shell 是一个抽象概念，shell的一切操作都在计算机内部，负责处理人机交互，执行脚本等，是操作系统能正常运行的重要组成部分。bash，ash，zsh，tcsh等是shell这个抽象概念的一种具体的实现，都是一个程序，都能生成一个进程对象。是borne again shell的缩写,Linux上默认采用的是bash。那怎么知道当前 Linux 用的是哪个呢？

    echo $SHELL

- 如果输出的是：csh或者是tcsh，那么你用的就是C Shell。
- 如果输出的是：bash，sh，zsh，那么你的用的可能就是Bourne Shell的一个变种。

对于 Mac，OS X 10.2之前默认的是C Shell，OS X 10.3之后默认的是Bourne Shell。

## 程序通用

Linux 的核心思想就是一切皆文件。

查看程序装在了哪里，比如看看 node 装到了哪里：

    which node
    where node
    // 输出可能是这样:/usr/local/bin/node
### 环境变量 Linux

待续...

### 环境变量 Mac

其实所有的程序安装都是将文件从远程下载下来然后放在一个地方。然后这个文件是否可执行，那些用户可启动执行我们后面讲。但是我们每次执行并不把路径写全，比如：

    node -v

其实写全了应该是酱紫：

    /usr/local/bin/node -v

而这种简写归功于环境变量，Mac系统的环境变量，加载顺序为：

- /etc/profile
- /etc/paths
- ~/.bash_profile
- ~/.bash_login
- ~/.profile
- ~/.bashrc

系统级的环境变量添加直接修改 `/etc/paths` 文件，修改后直接生效。用户级的环境变量添加通过修改 `~/.bash_profile` 实现，修改完成后还要执行 `source ~/.bash_profile` 才能生效，但是如果你开了新的终端，那么在执行一次 `source ~/.bash_profile` 环境变量才能在当前终端生效。

参考：[(Mac)在bash和zsh配置环境变量path的几种方法](http://www.jianshu.com/p/020f3d02f538)

## 进程相关

启动进程的命令后加 `&`，将进程指定为后台进程，这样可以在 shell 做一些其他事情而不需要再打开新的窗口，如：

    gulp &
    // 启动时会给出一个进程ID，如：32750

但是关闭 shell 或 断开 ssh 连接后进程就退出了，这在开发机上不是我们的期望，我们期望服务一直运行着，这样就轮到 `nohup` 登场了：

    nohup gulp &

那怎么退出进程和重启进程呢？需要知道的东西有点多我们一点点来。首先是查看进程：

    // 查看所有进程
    ps -e
    // 能找到这样一行进程
    32750 pts/1    00:00:05 gulp

寻找的过程比较费劲，这里有一些技巧：

    // 查看当前用户启动的进程
    ps -u
    // Mac 下需要这样
    ps -U 用户名
    // 其实 Mac 用活动监视器查看更方便

可以看到形如下面信息：

    USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
    500       1888  0.5  1.9 1339056 159584 pts/1  Sl   10:55   0:05 gulp

如果你启动的进程比较多，会依然不好找，下面是配合 `grep` 进程搜索命令：

    ps -ef -l | grep gulp

最终我们要拿到 PID，这样我们能对线程做一些操作，比如杀掉它：

    kill 1888

线程，进程，进程ID(PID)，端口... 进程的端口是个什么鬼?

更多资料：

- [Shell 前后台进程切换](https://cnbin.github.io/blog/2015/06/15/shell-qian-hou-tai-jin-cheng-qie-huan/)
- [Linux进程管理命令](https://www.zybuluo.com/ghostfn1/note/123409)

## 用 vi 编辑文件

常用命令 

    // 将文件在 VIM 编辑器中打开
    vi filename
    // 唤起输入
    i
    // 保存退出
    esc
    :wq!

还有一些命令你可能用得到：
    
    // 放弃所作修改而直接退到shell下
    :q!
    // 另存为
    :w newfile
   
## 用户相关
    
创建用户 testuser

    useradd testuser
    
给已创建的用户设置密码，回车后输入密码

    passwd 用户名

删除用户 testuser

    userdel testuser

切换用户(switch user)

    su username

查看已有用户(具备 root 权限才可以，Mac 下无效)

    cat /etc/passwd
    // 简化输出版
    cat /etc/passwd|grep -v nologin|grep -v halt|grep -v shutdown|awk -F":" '{ print $1"|"$3"|"$4 }'|more

添加用户组

    groupadd testgroup

删除用户组

    groupdel testgroup

用户的文件夹一般在 `/home` 下。

改变文件或文件夹所有者

    chown [-R] 账号名称 文件或目录

## 常用

新建文件夹

    mkdir 文件夹名

删除文件

    rm 文件名

删除文件夹和其中的内容

    rm -rf 文件夹名称

重命名文件或文件夹

    mv 旧名 新名

移动文件夹也可以用上面的命令

    mv 旧文件路径 新文件路径

复制文件夹

    cp 被复制的文件 复制到的路径

查看命令行当前的路径

    pwd

上传文件

    // 本地
    scp local_file remote_username@remote_ip:remote_folder
    scp dist-b.zip work@bjyz-coparch10.epc.baidu.com:/home/work/apache-tomcat-6.0.39/webapps/ROOT/

XShell 远程传文件好用

删除输入或粘贴的一大坨字符串

    Ctr + u

wget，从服务器下载文件。

## 权限管理

Linux系统中的每个文件和目录都有访问许可权限，用它来确定谁可以通过何种方式对文件和目录进行访问和操作。文件或目录的访问权限分为只读，只写和可执行三种。

    // 查看文件所属权限
    ls -l
    // 可以看到下面的权限描述
    -rw-rw-r--
    drwxrwxr-x

注意这里共有10个位置，第一个字符指定了文件类型，`d` 代表文件夹，`-` 代表文件，`l` 代表引用。

之后的 9 个字母分成三组，每三个字母一组。

- r代表只读；
- w代表写；
- x代表可执行；
- 横线代表空许可。

3 组分别对应不同的用户：文件主 组用户 其他用户。

执行 `ls -l` 可以看到 `dist` 文件夹的权限情况：

    drwxr-xr-x  root  root  dist
    
我们执行命令 `chmod o+w,g+w dist`，发现文件夹的权限变成了这样：

    drwxrwxrwx  root  root  dist

上面命令什么意思？`chmod` 是变更权限的命令。`o+w,g+w` 是给指定用户赋指定权限：

- u 表示“用户（user）”，即文件或目录的所有者。
- g 表示“同组（group）用户”，即与文件属主有相同组ID的所有用户。
- o 表示“其他（others）用户”。
- a 表示“所有（all）用户”。它是系统默认值。

操作符号可以是：

- \+ 添加某个权限。
- \- 取消某个权限。
- = 赋予给定权限并取消其他所有权限（如果有的话）。

合起来编写可能就是这样的：

    sudo chmod a+x 文件名

后面两项分别是权限和文件夹。

chgrp -- 改变文件或目录所属的组

    sudo chgrp -R username filename

chown -- 更改某个文件或目录的属主

    sudo chown -R username filename
    // 用 $USER 代表当前用户

前端工具经常用的的路径：

    // node 全局命令的入口
    /usr/local/bin
    // 全局 node_modules路径
    /usr/local/lib/node_modules
    
## 零碎

### 查看文件行数

有些系统生成的文件比较大，怎么能不打开文件统计文件行数呢？

    wc -lcw file1 file2

参数说明：

    -c 统计字节数
    -l 统计行数
    -w 统计字数
    -m 统计字符数

## 杂项

Linux安装node.js的binaries包：
http://blog.csdn.net/justforfly/article/details/39293819

查看 Linux 内核版本，有时也叫 binaries: uname -a

    3.10.0_3-0-0-11 CST 2015 x86_64 x86_64 x86_64 GNU/Linux

查看 centos 版本

    cat /etc/issue
