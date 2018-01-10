# 《鸟哥的 Linux 私房菜》读书笔记

> 这是全栈系列第一篇，为了把底层基础打的更牢靠些，先从一本操作系统名作开始吧，由于这本书没有电子版发行，这篇是阅读纸质版的笔记，方便查阅和自我梳理。

## Linux 的规则和安装

历史回顾 -- 程序员是个年轻的职业：

- 1985 年 Windows 1.0 发布；
- 1996 年 Linux 1.0 正式上线。

之前的计算机基本是实验室里东西，实际使用单位也只有不差钱的政府和研究性质的高校。

Linux 能干啥？企业应用，网路服务，企业网络管理。

如何学习 Linux？如果只想“会使用”Linux，那么 X Window 也足够了；如果想深入学习 Linux，那么命令行才是真确姿势。

Linux 的安装可以在 Virtuabox 中练习，练习一些系统初始化的设置，现在一般是云服务器，提交一个配置表单提供方就直接重装了，所以这里不展开。

Linux 下的两种桌面环境：GNOME[nəʊm], KDE(Kool Desktop Environment)。

装某些软件有对系统的要求，查看内核版本和发行版本号：

```shell
# 查看 Linux 内核版本，有时也叫 binaries
uname -a
# 结果：3.10.0_3-0-0-11 CST 2015 x86_64 x86_64 x86_64 GNU/Linux

# 查看 centos 版本
cat /etc/issue
# 结果：CentOS release 6.3
```

然后就是用 `man` 来获取命令的帮助，比如：

```shell
man cat
```
最后记住忘了 root 密码不用重装系统也能搞定，但愿你永远用不到。什么？你担心不安全？哦，可以通过加堡垒机之类的方案做增强。

## 文件与目录

### 那些重要的文件 与 FHS

`/etc/` 下存放系统的重要配置，其中 `/etc/shadow` 存放所有的用户名和密码，当然只有 root 权限才能看，密码当让也是加过密的。

`/etc/group` 中存放的是用户组信息。

`/etc/profile` 中存放全局的环境变量。可以在文件的 `Path manipulation` 部分修改。

除了上面这些系统定义好的文件与文件夹之外，Linux 对软件和用户也提出了规范 -- FHS(Filesystem Hierarchy Standard)。

比如 `/home/` 下，放用户目录，在新建用户的时候 CentOS 6.3 会自动在 `/home/` 下创建同名目录(CentOS 4.3需要手动创建)。

比如 `/usr/local`，建议管理员将软件安装到这里，Redis 和 MondoDB 都是这么建议的。

### 文件权限

说到文件权限，就不得不提用户和用户组的相关内容，但是这里我们花开两朵各表一枝，先说文件权限，假设所有用户和用户组以及两者之间的关系已经确定不变。

Linux 作为多用户操作系统文件权限是其保证安全的根本。怎么查看一个文件或文件夹的权限呢？

```shell
ls -al
ll -a
# 比如 /home/ 下我自己的目录是下面这样
drwx------ 11 longze    longze  4096     Dec 22 20:17 longze
[权限]   [连接] [所有者]  [用户组] [文件容量] [修改日期]    [文件名]
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

用 `chmod` 可变更权限，如 `chmod o+w,g+w longze`：

- `u` 表示“用户（user）”，即文件或目录的所有者。
- `g` 表示“同组（group）用户”，即与文件属主有相同组ID的所有用户。
- `o` 表示“其他（others）用户”。
- `a` 表示“所有（all）用户”。它是系统默认值。

改变文件的所有者和用户组，加 `-R` 参数可修改子目录下的全部文件权限：

```shell
# 改变 owner
chown -R 用户名 文件(夹)名
# 改变 group
chgrp -R 用户组名 文件(夹)名
```

### 文件与目录管理

先来一组基础命令

```shell
# 查看当前路径
pwd
# 新建文件夹
mkdir -p a/b/c
# 删除文件夹及其内部的全部内容
rm -rf 文件夹名称
# 复制，复制文件夹以及里面的内容加参数 -r，联通文件属性复制加 -p
cp -rp 源文件 目标文件
# 移动文件，文件更名
mv 源文件 目标文件
# 从远程下载文件
wget
# 新建文件，
touch text
# 读文件
cat text
# 在当前目录以及其子目录下有没有一个 text 文件
find ./ -name text
```

有些命令我们在任何地方都可以执行，这归功于环境变量，可以用 `echo` 将此变量打印出来查看：

```shell
echo $PATH
# 结果：/usr/local/bin:/usr/bin:/bin
```

当我们执行一个命令的时候，Linux 会从上面的那些文件夹中(以冒号间隔)查找有没有我们输入的命令对应的可执行文件，如果找到了就执行。想要对所有户都生效修改 `/etc/profile` 文件，想要对当前用户生效修改 `~/.bash_profile` 文件，修改的方式都是在行尾加上一行：

```shell
# 添加某某环境变量
export PATH=$PATH:自定义路径
```

如果想知道命令 `ls` 具体在哪里可以用 `which ls` 命令。

还有一个文件默认权限的设置 umask，查看默认权限有下面两种形式：

```shell
umas
# 结果：0002
umas -S
# 结果：u=rwx,g=rwx,o=rx
```

0002 的第一位是特殊权限先不管他，后面的 002 对应 u=rwx,g=rwx,o=rx。rwx 对应 421，然后用默认全有的 7 减去有的权限就是看到的数字。所以有一个大招叫 `chmod 777`。重新设置也很简单：

```shell
umask 000
umask -S
# 结果：u=rwx,g=rwx,o=rwx
```

`inode` 记录索引和权限，`block` 存储具体的内容，还有一些分区和挂载相关的内容都已经工具化了，不详诉，唯一需要掌握的是软连接。软连接是相对于硬连接(hard link)使用inode做关联指向，软连接又叫符号连接(symbolic link)。硬连载资源使用上比较有优势，但是有不能跨目录等限制，反而软连使用比较广泛。

```bash
# 建软连，aaa 连到 sh01.sh
ln -s sh01.sh aaa
# 查看文件可以看到多出来一个文件
ls
# 输出：aaa sh01.sh
# 然后 bash aaa 与 bash sh01.sh 等价
bash aaa
```

最后补一个打包压缩和解压的命令：

```bash
# 压缩
tar -jcv -f a.tar.bz2    a
            压缩后的名称   被压缩的文件夹
# 解压到当前文件夹
tar -jxv -f a.tar.bz2 -C ./
tar -zxv -f a.tar.gz -C ./
# 不解压也可以看目录
tar -jtv -f a.tar.bz2
```

## Shell

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
- `p` 将复制的一行粘贴在当先行的下一行；
- `P` 将复制的一行粘贴在当先行的上一行；

若未修改可以 `:q` 直接离开，如果已经修改但是想放弃修改强制离开可以用 `:q!`。

### bash

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

所有的命令都在里面了，默认能存1000条，需要注意的一点是只有 bash 注销后才写文件。还有一个别名的功能，还记得 `ll` 等同于 `ls -l`，可以用 `alias` 查看更多简写：

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
# 这样设置的别名在新命令行窗口中不生效，要想永久生效参考下面这篇文章：
test -f ~/.bash_aliases && source ~/.bash_aliases
```

还有一个比较重要的概念那就是环境变量了，使用 env 或者 export 可以看到所有的环境变量：

```shell
env
# 部分结果
PATH=/usr/local/bin:/usr/bin
USER=zhaoxiaoqiang
# 查看一个环境变量
echo $USER
# 临时声明一个环境变量(通常大写字符为系统默认变量，用户变量建议用小写)
myName="xiao qiang"
echo $myName
# 若变量需要在其它子进程中使用，可以用 export 变成环境变量
# 注意是子进程，在其它命令行窗口依然调用不到的
# 如果想在任意命令窗口都可以使用，重启后依然可以使用，需要修改环境变量配置文件
export myName
# 销毁变量和环境变量都可以用 unset
unset myName
```

其实环境变量有很多个，PATH 是比较特别的一个，命令执行时如果当前目录没有此命令就从 PATH 环境变量的值所配置的文件路径一个个找过去。

还有一个非常重要的部分 -- 管道命令(pipe)，其实就是把命令输出的结果按行再做一次加工，方便查看，用到的手段主要有 cut 和 grep 两种，下面用一个例子来说明：

```shell
# 用下面命令可以看到好长一串
echo $PATH
# 比如我的电脑是这样：
#/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/mongodb-osx-x86_64-enterprise-3.4.10/bin/
# 那我能不能一个个看呢？当然可以
echo $PATH | cut -d ":" -f 1,2
# 这样就能看到第一个和第二个了：/usr/local/bin
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

最后是数据流重定向，如果你看到过 `2> /dev/null` 这样的 shell 片段并对他感兴趣可以看这一部分。

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

如果打算自执行，那么第一行要声明解析这个文件的解析器。然后第二段是注释，写好注释要从 Hello world 抓起。然后就是就是打印输出，最后是返回值。下面加大难度继续进阶：

```bash
#!/bin/bash

# File: sh02.sh
# Desc: 创建三个文件夹，前缀由用户输入，后缀是昨天今天明天的日期
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

> 插播：还可以用 source 来执行 shell 脚本，区别是 source 是在父线程里直接执行，其他是在子线程里执行，子线程里面的变量不会在父线程里生效。

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

```bash
#!/bin/bash

# File: sh03.sh
# Desc: if...then Demo, 判断端口是否暂用
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

```bash
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

```bash
sh [-nvx] 某.sh
# -n 不执行，只检查语法
# -v 在执行前先将 shell 输出
# -x 将执行到的 shell 输出，排查分支逻辑的好办法
```

shell script 就简单讲这么多，更深入的学习推荐《Linux Shell 脚本攻略》。

## 使用者管理

### 账号管理

Linux 作为多账号系统账号管理是很重要的一环，但是随着云主机的普及，以及服务器成本的下降，基本不会出现很多人公用一台主机，和复杂的分组管理的情况，所以这一趴只讲最重要的原理和最实用技巧。

在原理上每个用户都有一个 ID，为了和用户组作区分，用户 ID 称为 UID，而用户组 ID 称为 GID。

所有的用户都在 `/etc/passwd` 中记录：

```bash
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

下面是用户实用命令：

```bash
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

```bash
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

查看文件权限的时候会看到有用户组的信息，实际上一个文件只能属于一个用户组，但是一个用户可以有多个用户组，那么这个用户组是哪一个呢？这涉及到“有效用户组”这一概念，当让有效用户组是可以切换的，相关命令如下：

```bash
# 查看属于那些组，排在第一个的就是有效账户
groups

# 修改有效账户
newgrp t1_group
```

### 磁盘管理

磁盘就是自家小院儿，哪块地种白菜哪块地养猪要规划好，万一猪把白菜给拱了就不好了。首先看看有几亩地(一般是在 `/home` 下建用户文件夹)：

```bash
df -h /home
# 结果：
# Filesystem            Size  Used Avail Use% Mounted on
# /dev/vdb              117G   19G   93G  17% /home
```

然后开看文件系统是什么类型，VFAT是不支持磁盘配额管理的，下面的 `ext4` 是没问题的。

```bash
mount | grep home
# 结果：
# /dev/vdb on /home type ext4 (rw,_netdev)
```

管理磁盘主要是“磁盘限额”，也就是 quota，用来限制某用户最多可以使用多少磁盘资源。然后大体流程是先生成限额配置文件，然后将这些配额方案绑在用户账号上。

```bash
edquota -p 限额范本号 -u 用户账号
```

备注：目录、挂载点、文件系统的关系 --> 首先系统会装进一块硬盘，然后建立起目录结构，如果硬盘不够用需要将硬盘“挂载”到某个目录下才能通过目录访问到此硬盘，然后才能读写，每一块硬盘都是独立的文件系统。我们要做的磁盘配额管理只能针对整个文件系统进行限制。这一块还没验证过，不知道理解的对不对。

### 定时任务

定时任务还有个大名叫“例行性工作(crontab)”，Linux 的强大之处就是不仅可以指定多长时间后执行某些命令(setTimeout)，还能指定一个时间，比如我早上写好一封邮件，指定下午 6 点发出去。

```bash
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
# 6	2018-01-04 22:24 a zhaoxiaoqiang

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

```bash
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

将进程放在后台执行，比如我们启动一个 web 服务 `npm run dev` 后还想在同一个命令行中执行点别的，就可以加一个 `&` 符号，执行后会输出后台命令编号和PID，进入后台的进程还可以将输出打在命令行界面上。退出后台服务最简单粗暴的方式就是将命令行窗口直接关闭，但是简单粗暴解决不了复杂的需求，下面展示更丰富的后台进程控制命令：

```bash
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

还有一种情况，我们用 vim 编辑的时候有时需要从其他地方看点信息，这时就可以将当前的 vi 编辑放进后台：

```bash
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

```bash
ps -l
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
0 R   500   796 16158  0  80   0 - 27024 -      pts/2    00:00:00 ps
0 S   500 16106 16105  0  80   0 - 26557 -      pts/2    00:00:00 bash
0 S   500 16158 16106  0  80   0 - 27142 -      pts/2    00:00:00 bash
```

只有 ps 本身和几个 bash，我的 pm2 呢？我的 npm 和 node 呢？看来必须使用查看全部系统命令才有可能找到我关心的内容，`ps axjf` 能看到全部进程，并且可以标记出父进程。父子进程的概念比较简单，如果 A 进程启动了 B 进程，那么 A 进程就是 B 进程的父进程，反过来说 B 进程是 A 进程的子进程，但是这种关系和在进程列表中看到的结果可能不一样，因为进程之间的调用还存在一种“功成身退”的情况，什么意思？举例来说 A 启动 B，B 又启动 C，但是 B 可能会悄然引退就像没有存在过，看到的是 A 与 C 的父子关系。

```bash
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

最后说一下 kill，就是想砍哪个进程砍哪个进程，而且一刀毙命，上面的 PID 就是进程ID(Process ID)，语法也很简单：`kill PID`。

## 结语

终于看完了...

看这个类型的书就要定个计划，不间断的一口气看完，我看这本书前后用了不到一个月看了三遍，每天坚持看一章。具体看书的过程大概是三遍，第一遍快速看，不最求细节，知道讲了什么，我需要从中提取什么信息进我的认知框架，比如进程管理这一章第一遍先知道有进程有前台、后台、脱机的概念，这些概念为了解决什么问题，用的什么命令解决的，然后画一些标记。第二遍开始打开电脑，假设我遇到了一个问题，要怎么利用这一章提到的东西来解决，这其中可能会遇到与书上有出入的地方，也可能遇到一些问题书中并为提及，结合 Google 将解决问题的过程记录到笔记中。最后再过一遍看看有什么漏掉的没有，这一次就像一个有经验的人看同行写的书。

## 关于作者

鸟哥本人的资料在网络上比较少，鸟哥本命蔡德明，现在在昆山科技大学任教。

更多内容：

http://linux.vbird.org/vbird/vbird4.php

https://news.cnblogs.com/n/517869/

还有个 PHP 方面的鸟哥，本名惠新宸，前百度员工，大搜上还有其代码在跑，现在在链家。

这里有一篇专访：

http://mp.weixin.qq.com/s/-RPRQ78k5F-ZoVv8IJC_zg
