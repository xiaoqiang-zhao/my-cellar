# Linux 备忘笔记

> 前端很多人都不是计算机相关专业的科班出生，但是前端的环境越来越复杂，好多人脚手架出了问题无从下手查。

## 程序通用

Linux 的核心思想就是一切皆文件。

查看程序装在了哪里，比如看看 node 装到了哪里：

    which node
    where node
    // 输出可能是这样:/usr/local/bin/node

其实所有的程序安装都是将文件从远程下载下来然后放在一个地方。然后这个文件是否可执行，那些用户可启动执行我们后面讲。但是我们每次执行并不把路径写全，比如：

    node -v

其实写全了应该是酱紫：

    /usr/local/bin/node -v

而这种简写归功于 `.bash_profile` 文件，每个用户都有一个这样的文件(用户文件夹可能在 `/home/username/.bash_profile`)，还有一个全局的文件在 `/root/username/.bash_profile`。我们随便找一个打开看看：

    cat .bash_profile
    # .bash_profile
    
    # Get the aliases and functions
    if [ -f ~/.bashrc ]; then
    	. ~/.bashrc
    fi
    
    # User specific environment and startup programs
    
    PATH=$PATH:$HOME/bin
    
    export PATH

并不是每个全局程序都需要配置的，一般是把全局能执行的文件放在 `bin` 目录下，同样每个用户自己有一个 `bin`。看一下 `bin` 目录，我们常用的程序都在里面：

    cd bin
    ls
    
    // 输出：
    node
    n
    npm

修改完执行下面命令使环境变量生效：

    $ source ~/.bash_profile

除了通过修改配置文件可以设定更多的全局命令，全局命令不仅我们自己敲的时候要用到，很多软件的执行依赖其他可执行文件，这时就需要修改 `.bash_profile` 文件添加环境变量，在行为插入：

    export N_PREFIX=/opt/node #node实际安装位置
    export PATH=$N_PREFIX/bin:$PATH

注：这里其实没看懂具体意思，需要找个东西验证一下，比如 ip 那个例子；探索一下世纪的例子，gulp 是怎么可以全局执行的？

显示命令的文档，如显示 `gulp` 使用文档：

    man gulp
    // 注：按 q 退出
    // 并不是所有命令都提供文档
 
## 进程相关

启动进程的命令后加 `&`，将进程指定为后台进程，这样可以在 shell 做一些其他事情而不需要再打开新的窗口，如：

    gulp &
    // 启动时会给出一个进程ID，如：32750

但是关闭 shell 或 断开 ssh 连接后进程就退出了，这在开发机上不是我们的期望，我们期望服务一直运行着，这样就轮到 `nohup` 登场了：

    nohup gulp &

那怎么退出进程和重启进程呢？需要知道懂东西有点多我们一点点来。首先是查看进程：

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
    
给已创建的用户 testuser 设置密码

    passwd testuser

删除用户 testuser

    userdel testuser

切换用户(switch user)

    su username

查看已有用户(具备 root 权限才可以)

    cat /etc/passwd
    // 简化输出版
    cat /etc/passwd|grep -v nologin|grep -v halt|grep -v shutdown|awk -F":" '{ print $1"|"$3"|"$4 }'|more

添加用户组

    groupadd testgroup

删除用户组

    groupdel testgroup

用户的文件夹一般在 `/home` 下。
    
## 常用

新建文件

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

上传文件

    // 本地
    scp local_file remote_username@remote_ip:remote_folder
    scp dist-b.zip work@bjyz-coparch10.epc.baidu.com:/home/work/apache-tomcat-6.0.39/webapps/ROOT/

XShell 远程传文件好用

## 权限管理

Linux系统中的每个文件和目录都有访问许可权限，用它来确定谁可以通过何种方式对文件和目录进行访问和操作。文件或目录的访问权限分为只读，只写和可执行三种。

    // 查看文件所属权限
    ls -l
    // 可以看到下面的权限描述
    -rw-rw-r--
    drwxrwxr-x

注意这里共有10个位置，第一个字符指定了文件类型，`d` 代表文件夹，`-` 代表文件。

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

上面命令什么意思？`chomd` 是变更权限的命令。`o+w,g+w` 是给指定用户赋指定权限：

- u 表示“用户（user）”，即文件或目录的所有者。
- g 表示“同组（group）用户”，即与文件属主有相同组ID的所有用户。
- o 表示“其他（others）用户”。
- a 表示“所有（all）用户”。它是系统默认值。

操作符号可以是：

- + 添加某个权限。
- - 取消某个权限。
- = 赋予给定权限并取消其他所有权限（如果有的话）。

后面两项分别是权限和文件夹。

chgrp -- 改变文件或目录所属的组

    chgrp -R username filename

chown -- 更改某个文件或目录的属主

    chown -R username filename

## 零碎

### 查看文件行数

有些系统生成的文件比较大，怎么能不打开文件统计文件行数呢？

    wc -lcw file1 file2

参数说明：

    -c 统计字节数
    -l 统计行数
    -w 统计字数
    -m 统计字符数
