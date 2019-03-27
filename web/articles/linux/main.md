# Linux 备忘笔记

> 前端很多人都不是计算机相关专业的科班出生，但是前端的环境越来越复杂，好多人脚手架出了问题无从下手查，需要部署服务器还需要后端帮忙，把工作中用到的一些技巧做整理，方便自查。

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

删除输入或粘贴的一大坨字符串，准确的说是删除光标之前的内容：

    # 删除光标之前的内容
    Ctr + u
    #删除光标之后的内容
    Ctr + k

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

查看命令别名

    alias
