# Linux 入门基础

> 本文是全栈系列第一篇，主要讲那些一定要知道的基础概念，有了这些基础概念才能更好的学习和使用 Linux，而不是零散的记住几个命令。除了基础概念还记录了一些我在使用 CentOS 是遇到的问题和解决办法，这些问题都是初学者大概率会遇到的问题。

## Linux 概述

Linux 是一个多用户操作系统，诞生于 1996 年。Linux 能干啥？企业应用，网路服务，企业网络管理。

如果家里有旧电脑，装一个 Liunx 来是必要的，装机传送: [https://linux.cn/article-1471-1.html](https://linux.cn/article-1471-1.html)。如果想要图形化界面记得选择 GNOME。

如何学习 Linux？如果只想会使用 Linux，那么 X Window 也足够了；如果想深入学习 Linux，那么命令行才是真确姿势。

装某些软件有对系统版本有特定的要求，查看内核版本和发行版本号是一项必要的技能：

```shell
# 查看 Linux 内核版本，有时也叫 binaries
uname -a
# 输出：3.10.0_3-0-0-11 CST 2015 x86_64 x86_64 x86_64 GNU/Linux

# 查看 centos 版本
cat /etc/issue
# 输出：CentOS release 6.3
```

## 文件与目录

### 那些重要的文件 与 FHS

`/etc/` 下存放系统的重要配置，比如上面提到的存放系统版本的文件`/etc/issue`，还有一个重要文件 `/etc/shadow` 存放所有用户的用户名和密码，当然只有 root 才能看，密码当然也是加过密的。

`/etc/group` 中存放的是用户组信息。

`/etc/profile` 中存放全局的环境变量。可以在文件的 `Path manipulation` 部分修改。

除了上面这些系统定义好的文件与文件夹之外，Linux 对软件放在哪里和用户数据放在哪里也提出了规范 -- FHS(Filesystem Hierarchy Standard)。

FHS 建议用户目录放在 `/home/` 下放，在新建用户的时候 CentOS 6.3 会自动在 `/home/` 下创建同名目录，CentOS 4.3需要手动创建，或者在添加用户的时候加 `-m` 参数，像这样 `useradd 用户名 -m`。

FHS 建议管理员将软件安装到 `/usr/local`，Redis 和 MondoDB 都是这么建议的。

### 文件权限

说到文件权限，就不得不提用户和用户组的相关内容，我们花开两朵各表一枝，先说文件权限，假设所有用户和用户组以及两者之间的关系已经确定不变。

Linux 作为多用户操作系统文件权限是其保证安全的根本。怎么查看一个文件或文件夹的权限呢？

```shell
ls -l
ll
# 比如我自己的目录有下面这样的一个文件夹和两个文件
drwxrwxr-x 8 zhaoxiaoqiang zhaoxiaoqiang 4096 Jan 16 10:33 code
-rwxrw-r-- 1 zhaoxiaoqiang zhaoxiaoqiang  241 Jan  7 11:21 sh01.sh
lrwxrwxrwx 1 zhaoxiaoqiang zhaoxiaoqiang    7 Jan  8 21:27 sh01.sh-link -> sh01.sh
[权限]       [所有者]        [用户组]            [修改日期]    [文件(夹)名]
```

两条命令等价，第一个字母代表文件类型：

- `d` 代表文件夹;
- `-` 代表文件;
- `l` 代表引用。

之后的 9 个字母分成三组，每三个字母一组，分别对应“文件主”、“组用户”、“其他用户”:

- `r` 代表只读；
- `w` 代表写；
- `x` 代表可执行；
- `-` 代表空许可。

用 `chmod` 变更权限，如 `chmod o+w,g+w 文件名` 添加权限，`chmod o-w,g-w 文件名` 移除权限:

- `u` 表示“用户（user）”，即文件或目录的所有者。
- `g` 表示“同组（group）用户”，即与文件属主有相同组ID的所有用户。
- `o` 表示“其他（others）用户”。
- `a` 表示“所有（all）用户”。它是系统默认值。

用 `chown` 变更文件的所有者和用户组：

```shell
# 改变 owner
chown -R 用户名 文件(夹)名
# 改变 group
chgrp -R 用户组名 文件(夹)名
```

加 `-R` 参数可修改子目录下的全部文件权限。

### 文件与目录管理

先来一组基础命令

```shell
# 查看当前路径
pwd
# 新建文件夹
mkdir -p a/b/c
# 删除文件夹及其内部的全部内容
rm -rf 文件夹名称
# 复制，复制文件夹以及里面的内容加参数 -r，连同文件属性复制加 -p
cp -rp 源文件 目标文件
# 移动文件，文件更名
mv 源文件 目标文件
# 从远程下载文件
wget
# 新建文件，
touch text
# 读文件
cat text
# 在当前目录以及其子目录下有没有一个名为 text 文件
find ./ -name text
```

`inode` 记录索引和权限，`block` 存储具体的内容，还有一些分区和挂载相关的内容都已经工具化了，不详诉，唯一需要掌握的是软连接。软连接是相对于硬连接(hard link)使用inode做关联指向，软连接又叫符号连接(symbolic link)。硬连载资源使用上比较有优势，但是有不能跨目录等限制，反而软连使用比较广泛。

```shell
# 建软连，aaa 连到 sh01.sh
ln -s sh01.sh aaa
# 查看文件可以看到多出来一个文件
ls
# 输出：aaa sh01.sh
# 然后 bash aaa 与 bash sh01.sh 等价
bash aaa
```

有些时候需要不同服务器之间需要相互传文件:

```shell
scp x.zip work@cp01-ipage.epc.baidu.com:~/
```

### 打包压缩和解压：

```shell
# 压缩，使用不同的参数采用相应的压缩算法
tar -jcv -f a.tar.bz2    a
tar -zcv -f a.tar.gz     a
            压缩后的名称   被压缩的文件夹
# zip 命令压缩文件
zip a.zip a
# zip 命令压缩文件夹
zip -r ./a.zip ./a/*
# 解压到当前文件夹
tar -jxv -f a.tar.bz2 -C ./
tar -zxv -f a.tar.gz -C ./
# 解压 zip 包可以直接用 unzip 命令
# 注意解压路径是当前的执行路径
unzip 文件名.zip > /dev/null
# 指定解压到某个目录
unzip 文件名.zip -d the/path > /dev/null
# 不解压也可以看目录
tar -jtv -f a.tar.bz2
```

在某些解压脚本中你可能看到过 `2> /dev/null` 这样的 shell 片段，意思是不输出标准错误。因为被解压的文件可能不可靠，这样就会有很多错误输出，一般大面积的错误输出会保存在文件中，抛弃这些错误是比较好的选择。其中的 `>` 符号是重定向的语法，除了错误日志重定向，还可以重定向一些别的，下面是官方解释：

```shell
> file 将解压的文件重定向到 file
1> file 将解压的文件重定向到 file
2> file 将解压错误日志重定向到 file，/dev/null 是一种特定的写法，表示丢弃
&> file 将解压的文件和错误日志重定向到 file
```

## Shell

### 概述

鸟哥说“如果想要更深入的学习 Linux 的话，那么命令行模式才是不二的学习方式”，但是终端、命令行、shell、bash 是什么关系一直傻傻的理不清楚。

先说终端，这是个比较早的概念，在微软推出个人电脑前计算机比较昂贵，模式是一台中央计算机，连出几套显示器和键盘，最初把这一套套的显示器和键盘叫终端，后台有了专门的链接设备。再后来两边都在升级，中央电脑这边升级成了服务器集群(谷歌亚马逊)，终端这边升级为个人电脑，所以广义上讲所有连接了显示器和键盘以及可以链接其他计算机的计算机就是终端，但是随着时代的发展词还是原来的那个词(终端 Terminal)，意思却升级成了计算机上某种特定的软件，这种软件的交互方式是命令行，所以我们平时“说打开终端，在终端中输入什么” 就是“打开命令行工具，在命令行工具中输入什么”。还有一点意思上的升级，原来的终端指操控其他计算机的一种机器，现在的终端不仅指操作远程计算机也指操作当前计算机(终端本身)。

然后是 shell，shell 是一个抽象概念，操作系统是需要保护的，不是没有围栏的公园，而是只有几个入口的城堡，这座城堡就是操作系统的内核(kernel)，shell就是城门。bash，ash，zsh，tcsh等是shell这个抽象概念的一种具体的实现，都是一个程序，都能生成一个进程对象。是borne again shell的缩写,Linux上默认采用的是bash。那怎么知道当前 Linux 用的是哪个呢？

```shell
    echo $SHELL
```

- 如果输出的是：csh或者是tcsh，那么你用的就是C Shell。
- 如果输出的是：bash，sh，zsh，那么你的用的可能就是Bourne Shell的一个变种。

对于 Mac，OS X 10.2之前默认的是C Shell，OS X 10.3之后默认的是Bourne Shell。

### vim

首先要明确的就是三种模式：

- 一般模式，默认进入就是这种模式；
- 编辑模式，输入 “i、e” 等进入此模式，“ESC” 退出此模式；
- 命令行模式，输入 “:” 等进入此模式，“:wq” 保存并离开。

在一般模式下可以快速移动通过翻页等操作快速移动光标，然后进入编辑模式光标位置是不变的，下面列一些常用的操作：

- `ctr + f` 向下翻页；
- `ctr + b` 向上翻页；
- `数字 + space` 光标向后移动“数字”个位置；
- `0` 移到行首；
- `$` 移到行尾；
- `G` 移到文件的最后一行，主意已定要大写；
- `nG` 移到文件的第 n 行；
- `gg` 移到文件的第一行。

一般模式下也可以快速编辑，下面也是一些常用的命令：

- `dd` 删除所在行；
- `ndd` n 为数字，删除光标所在的向下 n 行；
- `yy` 复制光标所在的行；
- `p`(小写) 将复制的一行粘贴在当先行的下一行；
- `P`(大写) 将复制的一行粘贴在当先行的上一行。

编辑模式下:

- `Ctr + u` 删除光标之前的内容；
- `Ctr + k` 删除光标之后的内容。

若未修改可以 `:q` 直接离开，如果已经修改但是想放弃修改强制离开可以用 `:q!`。

另存为 `:w newfile`，将当前操作文件备份的常用命令。

### history

硬件 <--> 服务器内核 <--> Shell <--> 用户，shell 和 bash 的关系：bash 是 shell 的一种实现。我们来看看当前机器有多少个 shell 工具：

```shell
cat /etc/shells
# 结果：
/bin/sh
/bin/bash
/sbin/nologin
/bin/zsh
/bin/tcsh
/bin/csh
# 不同用户可以配置不同的 shell 工具
cat /etc/passwd
work:x:502:502::/home/work:/bin/bash
```

为什么要学 shell：全(可视化工具是shell的子集)、快(远程操作命令行非常快)。

下面我们来认真学学 shell，我们都知道按向上键可以调出已经输入过的命令，那如果有个牛人上个月在我电脑上输了一些牛逼的命令我现在能调出来吗？当然可以，那怎么调，一条条翻到上个月？

```shell
cat ~/bash_history
```

所有的命令都在里面了，默认能存1000条，需要注意的一点是只有 bash 注销后才写文件。

### alias

还记得 `ll` 等同于 `ls -l` 吧，还可以用 `alias` 命令查看更多简写：

```shell
alias
# 部分结果
ll='ls -lh'
gba='git branch -a'
md='mkdir -p'
# 还可以设置新的别名或修改已有别名
alias gp='git push'
# 删除别名
unalias gp
```

这样设置的别名在新命令行窗口中不生效，要想永久生效我们还要多了解一些东西，首先是系统级别的别名出于安全方面的考虑是不建议改的，我们能做的就是为每个用户添加自定义别名配置。在每个用户的文件夹下有一个 `~/.bashrc`，每次用户打开命令行都会执行这个文件，我们上面提到过 shell 不是只有 bash 这一种实现方式，如果你换了 zsh，zsh 在 Mac 上使用较为广泛，那么进入命令行执行的文件是 `~/.oh-my-zsh/oh-my-zsh.sh`，总之我们要在这里调用我们的别名配置文件。先说怎么写别名配置文件，一般别名配置文件的命名由 “shell工具名” 和 “aliases” 组成，比如 bash 下的别名配置文件推荐为 “.bash_aliases”，然后每个别名独占一行，像这样 ：`alias gp='git push'`。然后调用别名配置就简单了，向下面这样，先判断是否有别名配置文件，如果有那么就在同一进程中执行。

```shell
# 添加自定义别
test -f ~/.bash_aliases && source ~/.bash_aliases
```

### 父子进程

上面用到了 `source`，执行 shell 脚本有两种方式，一种是 `sh xx.sh`，另一种就是 `source xx.sh`，那么这两种方式有什么区别呢？我们用一段代码来说明一下，下面是一段简单的代码，只是声明一个变量，放在 `source.sh` 文件中：

```shell
#!/bin/bash

# File: source.sh
# Desc: source 调用示例
# History: 2018/01/19 zhaoxiaoqiang First release

# 声明变量
var1='var1-value'
```

当我们用 `sh` 这行这段代码时，运行结束后在命令行中是拿不到我们在 `source.sh` 中声明的变量的：

```shell
sh source.sh
echo $var1
# 输出为空
```

但是我们用 `source` 执行这段代码情况就不一样了：

```shell
source source.sh
echo $var1
# 输出：var1-value
```

source 是在父线程里直接执行，sh 是在子线程里执行，子线程里面的变量不会在父线程里生效。所以我们要用 `source` 来设置别名，这样在父进程中才可以使用。

### 环境变量

还有一个比较重要的概念那就是环境变量了，对应到 js 就是作用域变量。

其实所有的程序安装都是将文件从远程下载下来然后放在一个地方。然后这个文件是否可执行，哪些用户可启动执行我们后面讲。但是我们每次执行并不把路径写全，比如：

```shell
node -v
```

其实写全了应该是酱紫：

```shell
/usr/local/bin/node -v
```

而这种简写归功于环境变量，Mac系统的环境变量，加载顺序为：

- /etc/profile
- /etc/paths
- ~/.bash_profile
- ~/.bash_login
- ~/.profile
- ~/.bashrc

查看程序装在了哪里，比如看看 node 装到了哪里：

```shell
which node
where node
// 输出可能是这样:/usr/local/bin/node
```

使用 env 或者 export 可以看到所有的环境变量：

```shell
env
# 部分结果
PATH=/usr/local/bin:/usr/bin
USER=zhaoxiaoqiang
# 输出一个环境变量
echo $USER
# 临时声明一个环境变量(通常大写字符为系统默认变量，用户变量建议用小写)
myName="xiao qiang"
echo $myName
# 若变量需要在其它子进程中使用，可以用 export 变成环境变量
# 注意是子进程，在其它命令行窗口依然调用不到的
# 如果想在任意命令窗口都可以使用，重启后依然可以使用，需要修改环境变量配置文件
export myName
# 销毁变量和环境变量都可以用 unset，注意变量明前不带 $
unset myName
```

其实环境变量有很多个，PATH 是比较特别的一个，命令执行时如果当前目录没有此命令就从 PATH 环境变量的值所配置的文件路径一个个找过去。系统级的环境变量都在 `/etc/profile` 中设置，你可以在里面找到 PATH、HOSTNAME、HOME 等一大堆环境变量的设置逻辑，如果想添加一条，那么在下面加两行这样的代码：

```shell
ttt='晓强测试全局环境变量ttt'
export ttt
```

全局环境变量就加好了，但是要生效还要手动执行一下 `source /etc/profie`，当然系统级的设置需要以root 的身份来执行。如果只想为某个用户设置添加环境变量，每个用户下都有一个 `.bash_profile` 文件，在这里添加环境变量就可以，生效逻辑和上面的系统级环境变量相同。

还有一个非常重要的部分 -- 管道命令(pipe)，其实就是把命令输出的结果按行再做一次加工，方便查看，用到的手段主要有 cut 和 grep 两种，下面用一个例子来说明：

```shell
# 用下面命令可以看到好长一串
echo $PATH
# 比如我的电脑是这样：
#/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/mongodb-osx-x86_64-enterprise-3.4.10/bin/
# 那我能不能一个个看呢？当然可以
echo $PATH | cut -d ":" -f 1,2
# 这样就能看到第一个和第二个了：/usr/local/bin:/usr/bin
# 所以 cut 的作用就是截取信息，grep 是过滤信息
# 比如我这里有一堆的 node 包：
ls -l
# 部分结果：
drwxr-xr-x  14 zhaoxiaoqiang  wheel  476 Dec 21 16:22 ala-cli
drwxr-xr-x  11 zhaoxiaoqiang  wheel  374 Dec 22 14:34 fecs
drwxrwxrwx  25 root           wheel  850 Dec  8 23:04 npm
# 如果我只想看我装的包(或者说权限是当前用户的包)，我可以这样：
ls -l | grep 'zhaoxiaoqiang'
# 部分结果：
drwxr-xr-x  14 zhaoxiaoqiang  wheel  476 Dec 21 16:22 ala-cli
drwxr-xr-x  11 zhaoxiaoqiang  wheel  374 Dec 22 14:34 fecs
# 其实就是按行分析，包含了某些信息的就输出，从而达到一种过滤的作用
# 最后过滤是支持正则的
```

### shell script

先来一个 Hello world：

```shell
#!/bin/bash

# File:    sh01.sh
# Desc:    print "Hello world."
# History: 2017/12/26 zhaoxiaoqiang First release

echo "Hello world."
exit 0
```

如果打算自执行，那么第一行要声明解析这个文件的解析器。然后第二段是注释，写注释这件事情要从 Hello world 抓起。然后就是就是打印输出，最后是返回值。下面加大难度继续进阶：

```shell
#!/bin/bash

# File: sh02.sh
# Desc: 创建三个文件夹，前缀由用户输入，后缀分别是昨天、今天、明天的日期
# History: 2017/12/26 zhaoxiaoqiang First release

# 获取用户输入
read -p "请输入文件名前缀:" inputFilename
# 无输入用默认值
preFilename=${inputFilename:-"defaultFilename"}
# 利用 date 取得所需文件名
yestady=$(date --date='1 days ago' +%Y%m%d)
tady=$(date +%Y%m%d)
tomorrow=$(date -d tomorrow +%Y%m%d)

yestadyFile=${preFilename}-${yestady}
tadyFile=${preFilename}-${tady}
tomorrowFile=${preFilename}-${tomorrow}
# 创建文件
touch "$yestadyFile"
touch "$tadyFile"
touch "$tomorrowFile"
```

这里用到了收集用户输入，默认值设置，获取时间字符串，拼接文件名，创建文件等操作。这一 Demo 必然会产生很多文件，可以用通配符来删除这些试验文件 `rm def*`;

下面开始讲 shell 的逻辑语法，包括 if-else、case、function、for 等，这里假设你对 js 很熟悉，我下面直接用程序解释程序。先来讲 `if (test)` 中的 test：

```shell
# 判断文件名是否存在
test -e 文件名 && echo '存在' || echo '不存在'
```

除了 -e 还有很多参数，这里挑选几个常用的来说一下，首先是文件：

- e 文件是否存在；
- f 文件是否以“文件”形式存在；
- d 文件是否以“文件夹”形式存在；
- w 文件是否可写；

然后是数字和字符串的比较，基础语法是这样：

```shell
# 大于小于
test 1 -gt 2 && echo '大于' || echo '不大于'
test 'a' == 'b' && echo '等于' || echo '不等于'
# 注意等号两边必须有空格
# 两个等号和一个等号效果相同，为了更好的可读性一般用两个等号
```
其他常用参数：

- eq 数字 ==
- ne 数字 !=
- gt 数字 >
- lt 数字 <
- ge 数字 >=
- le 数字 <=
- 字符串可以直接使用 == 和 !=

最后是多个条件之间的逻辑处理

```shell
# -a 且
test 2 -gt 1 -a 2 -lt 3 && echo '2大于1且小于3' || echo '--'
# -o 或
test 2 -gt 1 -o 'a' == 'b' && echo '2大于1或"a"等于"b"' || echo '--'
# ! 非，不大于 等价于 小于等于
test ! 2 -gt 1 && echo '2不大于1' || echo '--'
```

说完了 `if (test)` 中的 test 后可以来完整的说说 if 了：

```shell
#!/bin/bash

# File: sh03.sh
# Desc: if...then Demo, 判断8080和8081端口是否被暂用
# History: 2017/12/28 zhaoxiaoqiang First release

# 8080 端口被占用
if [$(netstat -tuln | grep "8080") == '']; then
    echo '8080 端口没有被占用'
elif [$(netstat -tuln | grep "8081") == ''];then 
    echo '8081 端口没有被占用'
else
    echo '8080 和 8081 端口都被占用'
fi
# 注：netstat -tuln 命令在 Mac 下的输出和 Linux 是不一样的，
#    所以此命令在 Mac 下得不到预期，Mac 下用 lsof -nP -iTCP 代替
```

上面代码有很多重复的，如果我们想找一个 8080 端口之后未被占用的端口怎么办呢？是循环登场的时候了：

```shell
#!/bin/bash

# File: sh04.sh
# Desc: 获取 8080 端口及以后未被占用的端口
# History: 2017/12/28 zhaoxiaoqiang First release
port=8080
# 这一这里的第一对双引号必须要加
# 然后 port 变量的引用必须以 $ 开始，并必须加引号(双引号也可以的)
while [ "$(netstat -tuln | grep '$port')" != "" ]
do
    # 数值运算必须 加 $ 和两层括号，不然就成了字符串拼接了
    port=$(($port+1))
done
# 字符串拼接直接写就行，并不需要 +
echo $port'端口没有被占用'

exit $port
```

最后说一点点调试技巧：

```shell
sh [-nvx] 某.sh
# -n 不执行，只检查语法
# -v 在执行前先将 shell 输出
# -x 将执行到的 shell 输出，排查分支逻辑的好办法
```

shell script 就简单讲这么多，更深入的学习推荐《Linux Shell 脚本攻略》。

## 使用者管理

### 账号管理

Linux 作为多账号系统，账号管理是很重要的一环，但是随着云主机的普及，以及服务器成本的下降，基本不会出现几十几百人共用一台主机，和复杂的分组管理的情况，所以这一趴只讲最重要的原理和最实用技巧。

在原理上每个用户都有一个 ID，为了和用户组作区分，用户 ID 称为 UID，用户组 ID 称为 GID。

所有的用户都在 `/etc/passwd` 中记录：

```shell
cat /etc/passwd
# 结果中的几行：
# root:x:0:0:root:/root:/bin/bash
# bin:x:1:1:bin:/bin:/sbin/nologin
# username:x:500:500::/home/username:/bin/bash
```

所有的信息以冒号间隔，以 username 为例分别代表：

- username 用户名
- x 密码占位符
- 500 用户 UID，0 是 root，1-499是系统账户，500及以上是用户账户
- 500 用户第一优先分组，新建的用户会生成一个同名用户组 
- 用户信息说明，详情参见 chfn 命令
- /home/username 用户主文件夹，就是 cd ~ 到的文件夹
- /bin/bash 用户登陆后默认使用的 shell 工具设置

下面是关于用户的实用命令：

```shell
# 添加用户，需要 root 权限，
# -m 创建主文件夹，在 CentOS 4.3 等底版本系统中创建用户不会自动创建主文件夹
useradd 用户名 -m

# 删除用户，需要 root 权限
userdel 用户名

# 为用户设置密码，需要 root 权限
passwd 用户名

# 切换用户
su 用户名

# 查看用户所在的全部用户组，一个用户是可以有多个用户组的，
# 省略用户名是查看当前用户，
# 此命令没有权限限制，可以随便查看别人的用户组信息
groups 用户名
```

账户还可以设置多长时间强制改密码，还可以设置账号失效日期来收保护费，这些一般用不到的就不讲了，下面再来一组用户组实用命令：

```shell
# 新建用户组
groupadd 用户组名

# 删除用户组
groupdel 用户组名

# 为用户组添加用户
gpasswd -a 用户名 用户组名

# 为用户组删除用户
gpasswd -d 用户名 用户组名

# 查看用户组文件
/etc/group
```

查看文件权限的时候会看到有用户组的信息，实际上一个文件只能属于一个用户组，但是一个用户可以有多个用户组，那么这个用户组是哪一个呢？这涉及到“有效用户组”这一概念，新建文件时文件所属的用户组就是当前用户的“有效用户组”，当然有效用户组是可以切换的，相关命令如下：

```shell
# 查看属于那些组，排在第一个的就是有效账户
groups

# 修改有效账户
newgrp t1_group
```

### 磁盘管理

磁盘就是自家小院儿，哪块地种白菜哪块地养猪要规划好，万一猪把白菜给拱了就不好了。首先看看有几亩地(一般是在 `/home` 下建用户文件夹)：

```shell
# 查看磁盘占用
df -h /home
# 结果：
# Filesystem            Size  Used Avail Use% Mounted on
# /dev/vdb              117G   19G   93G  17% /home
```

如果磁盘满了就要看看哪些文件占地方：

```shell
# 一般到根目录，然后一层层的查下去找到占用空间较大的文件夹
du -ah --max-depth=1
# 删除日志文件释放空间
rm *.log
```

> 编外: 遇到一个坑记录一下，明明根目录下每个文件和文件夹都不大，但是硬盘使用率飙到了 100%，查来查去是 Nginx 的缓存占用了大量的磁盘空间，只要重启 Nginx 磁盘空间就会大量释放。

然后开看文件系统是什么类型，VFAT是不支持磁盘配额管理的，下面的 `ext4` 是没问题的。

```shell
mount | grep home
# 结果：
# /dev/vdb on /home type ext4 (rw,_netdev)
```

管理磁盘主要是“磁盘限额”，也就是 quota，用来限制某用户最多可以使用多少磁盘资源。然后大体流程是先生成限额配置文件，然后将这些配额方案绑在用户账号上。

```shell
edquota -p 限额范本号 -u 用户账号
```

备注：目录、挂载点、文件系统的关系 --> 首先系统会装进一块硬盘，然后建立起目录结构，如果硬盘不够用需要将硬盘“挂载”到某个目录下才能通过目录访问到此硬盘，然后才能读写，每一块硬盘都是独立的文件系统。我们要做的磁盘配额管理只能针对整个文件系统进行限制。这一块还没验证过，不知道理解的对不对。

### 定时任务

定时任务还有个大名叫“例行性工作(crontab)”，Linux 的强大之处就是不仅可以指定多长时间后执行某些命令(setTimeout)，还能指定一个时间，比如我早上写好一封邮件，指定下午 6 点发出去。

```shell
# 查看 atd 是否启动，从下面可以看到 atd 服务在进程中
ps -ef | grep atd
# root      2261     1  0 21:49 ?        00:00:00 /usr/sbin/atd

# 重启一下试试，一般用户无法控制 atd 服务，必须用 root 权限
/etc/init.d/atd restart
# 不出意外的话会出两条 failed，
# Stopping atd:   [FAILED]
# Starting atd:   [FAILED]
# 使用 root 权限执行后出现下面提示就重启完成
# Starting atd:   [  OK  ]

# 添加一个延时任务，一分钟后删除某个空文件夹
# 注意不支持秒，恒定 minutes，加 s
at now + 1 minutes 回车后开始输入命令
rm -r 某空文件夹
# 回车到空行， ctrl + d 来终止输入
# job 2 at 2018-01-04 21:57
# 如果不是出现上面的定时成功提示，而是出现下面的提示，说明 atd 服务没有运行，需要确认已启动
# Can't open /var/run/atd.pid to signal atd. No atd running?

# 查看定时任务列表
atq
# 6	2018-01-04 22:24 zhaoxiaoqiang

# 查看某个延时任务，任务 id 就是上面的第一列
at -c 任务id

# 放弃执行定时任务
atrm 任务id

# 定时任务完成后，使用 atq 会看到这样一行提示：
# You have new mail
# 用 cat 读取后标为已读，再使用 atq 就看不到提示了

# 如果想指定时间，可以像下面这样
at 18:00 2018-01-01

```

at 中的任务是脱机任务，关闭远程登录命令行后依然会执行。关于 at 最后提醒一下，当我们使用 at 时会进入一个 at shell 的环境来执行工作命令，因此做好使用绝对路径。

例行性工作的另一个重要含义是每段时间，如每天、每周、每月或每小时定时去做一个事情。在 Linux 上通过 crontab 命令来实现，比 setTimeinterval 强悍很多，看到这里有那么一丢丢感慨，服务端能做的事情要比客户端尤其是浏览器多太多。

```shell
# 首先看看服务是否启动
service crond status
# 这个样子就是没问题了：crond (pid  4384) is running...
# 如果没有启动就：service crond start

# 添加定时任务,每天零点零分执行
crontab -e
0 0 * * * /home/zhaoxiaoqiang/create-folder-per-hour.sh
# 分 时 日 月 周

# 查看列表
crontab -l
```

定时任务最关键的是时间的设定，下面是一些比较重要的点：

- 数字范围，分：0-59，时：0-23，日：1-31，月：1-12，周：0-7(0和7都代表周日)；
- 星号(*)，任何时间都可以接受；
- 逗号(,)，分段，如 `0 3,6 * * *` 表示三点和六点各执行一次；
- 减号(-)，表示时间段，如 `0 3-6 * * *` 表示三点到六点每小时执行一次；
- 斜线(/)，表示单位间隔，如 `0 */4 * * *` 表示每四个小时执行一次；

最后提醒一下 crontab 也是脱机任务。

### 进程管理

进程：一个程序被加载到内存中运行，那么在内存中的那个数据就被称为进程(Process)。

将进程放在后台执行，比如我们启动一个 web 服务 `npm run dev` 后还想在同一个命令行中执行点别的，就可以加一个 `&` 符号，执行后会输出后台命令编号和PID(Process ID，进程ID)，进入后台的进程还可以将 log 输出在命令行界面上。退出后台服务最简单粗暴的方式就是将命令行窗口直接关闭，但是简单粗暴解决不了复杂的需求，下面展示更丰富的后台进程控制命令：

```shell
# 将进程压入后台
npm run dev &
# 输出：[1] 27590

# 列出后台进程
jobs -l
# 输出：[1]  + 27590 running    npm run dev

# 将后台进程拿到前台
fg %1
# 其实上面带加号的进程是首进程，可以免参数

# 再放进后台
ctrl + z
# 输出：[1]  + 27590 suspended  npm run dev
# 放进后台后进程属于暂停状态，表现为服务停止端口占用

# 让暂停的后台进程启动
bg %1
```

一般没有进程守护的进程如果终端关闭或连接的 ssh 断开后都会终止，如果不想让进程终止可以使用 nohup 和 & 配合实现：

```shell
nohup 进程 &
# 终止的时候用下面命令找 pid
ps aux | grep node
```

还有一种情况，我们用 vim 编辑的时候有时需要从其他地方看点信息，这时就可以将当前的 vi 编辑放进后台：

```shell
# 编辑某文件
vi ~/sh01.sh

# 将编辑器压入后台
esc
ctrl + z

# 然后可以打开别的文件复制点东西
cat sh03.sh

# 切回 vi 编辑
fg
```

再说说进程管理，如果你上个月启动了一个脱机任务，今天还能记得吗？所以我们需要一个命令将进程都列出来。鸟哥说 `ps -l` 可以看到自己启动的全部进程，然而实际验证看到的结果是这样：

```shell
ps -l
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
0 R   500   796 16158  0  80   0 - 27024 -      pts/2    00:00:00 ps
0 S   500 16106 16105  0  80   0 - 26557 -      pts/2    00:00:00 bash
0 S   500 16158 16106  0  80   0 - 27142 -      pts/2    00:00:00 bash
```

只有 ps 本身和几个 bash，我的 pm2 呢？我的 npm 和 node 呢？看来必须使用查看全部系统命令才有可能找到我关心的内容，`ps axjf` 能看到全部进程，并且可以标记出父进程。父子进程的概念比较简单，如果 A 进程启动了 B 进程，那么 A 进程就是 B 进程的父进程，反过来说 B 进程是 A 进程的子进程，但是这种关系和在进程列表中看到的结果可能不一样，因为进程之间的调用还存在一种“功成身退”的情况，什么意思？举例来说 A 启动 B，B 又启动 C，但是 B 可能会悄然引退就像没有存在过，看到的是 A 与 C 的父子关系。

```shell
# 需要关心调用路径和启动文件所在的路劲
node server
npm run server
# 参数需要每次都写
pm2 start server
npm run pm2
# 应该的顺序是：/sbin/init -> bash -> npm -> pm2 -> node
# 注：/sbin/init 是系统启动的第一个进程，也是一切其他进程的祖进程
# 但从进程列表中看到的顺序是：/sbin/init -> pm2 -> node

# 可以从父子进程中看出
ps axjf
# 输出：
# PPID   PID  PGID   SID    TIME COMMAND
#    0     1     1     1    1:58 /sbin/init
#    1  3253  3253  3253   75:43 PM2 v2.7.1: God Daemon (/home/zhaoxiaoqiang/.pm2)
# 3253  2457  2457  2457    7:38  \_ node /home/zhaoxiaoqiang/code/node-modules-manage/server              
# 3253 10663 10663 10663    4:03  \_ node /home/zhaoxiaoqiang/code/demo-12-4/server 
```

最后说一下 kill，就是想砍哪个进程砍哪个进程，而且一刀毙命：`kill PID`。

## 软件安装和管理

Linux 下我们使用软件包管理器来安装我们需要的软件，比如 Red Hat 公司的 Fedora、RHEL（Red Hat Enterprise Linux）和后来加入红帽的 CentOS，使用 rpm 和 yum 来安装软件，Ubuntu 使用 apt-get 来安装。

安装软件一般有两种方法，一种是直接下载编译好的安装包安装，另一种是下载源文件在本地先编译后安装。对于后者需要有编译工具才能进行，编译工具可以直接傻瓜式安装 `yum install gcc-c++`。

常用的库文件还有:

- make 编译辅助工具
- zlib 压缩和解压工具
- zlib-devel 开发版压缩和解压工具
- libtool 简化共享库的使用过程
- openssl 安全通讯支持库
- openssl-devel 开发版安全通讯支持库

看到有两个加了 `-devel` 后缀的包，加了此后缀表示是开发使用版，包含了头文件和开发支持库，用于抛出更详细的信息(如压缩和解压的过程信息，报错信息)。

zlib 比较特殊

```shell
Package zlib is already installed
zlib -v
bash: zlib: command not found
```
https://github.com/netdata/netdata/issues/24


这里有一个网站可以查询各种包: (https://rpmfind.net/linux/rpm2html/search.php)[https://rpmfind.net/linux/rpm2html/search.php]

## 零散命令

系统之间可以通过 http 来交互，一个非常有用的命令就是 `curl`，示例如下:

```shell
value=$(curl http://172.0.0.1:8080/get)
```

查看端口对应的进程 id:

```shell
lsof -i tcp:9999
```

查看 Web 服务是否启动成功

```shell
telnet 10.0.250.3 8090
```

## 参考

《鸟哥的 Linux 私房菜》

[CentOS 官网](https://www.centos.org/)

[Linux 版本选择](https://www.soosmart.com/topic/687.html)

[Systemd 定时器教程](http://www.ruanyifeng.com/blog/2018/03/systemd-timer.html)
