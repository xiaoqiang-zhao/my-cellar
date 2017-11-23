# MongDb 学习笔记

> 早闻大名，开始学习，下面是学习过程留下的笔记，力图用最少的时间，了解 80% 的内容。这个笔记也是以书《MongDB in Action》为主线来进行，会加一些官网和博客中的内容，这一篇是 Redis 的姊妹篇。

## 初识

诞生于 2007 年，和 Redis 一样，是为了解决数据结构的自动伸缩问题而产生的，生于云端，专门为 Web 而设计。

关键词：非关系型数据库、直观的数据模型、层次数据结构。

## 安装&运行

在官网的 [downloads](https://www.mongodb.com/downloads) 中有很多版本，我们选 Enterprise Server(企业版)，因为我们的最终目的是为了用在项目里。需要填一些信息，请放心大胆的填，随便写点什么就能过，也正是因为这样，ssh 无法直接验证成功，所以无法用 `wget` 来直接下载。

下载完成后我们把压缩包移动到和 Redis 同级目录 `/usr/local/` 下，然后解压。运行 MongoDB 还需要一个放数据的目录，默认是 /data/db，我们创建一下：

    sudo mkdir -p /data/db

转目录：

    cd mongodb-osx-x86_64-enterprise-3.4.10/bin

启动 MongoDB：

    ./mongod

然后就可以看到重要的启动信息了：

    MongoDB starting : pid=15390 port=27017

这里遇到了以一个坑，`/data/db` 这个目录的权限可能无法支持直接写操作，会报这样一个错 `Attempted to create a lock file on a read-only directory: /data/db`，然后 shutdown，加 sudo 是最简单快捷的处理方式，也可以改变此目录的权限。跳过此坑就可以再开一个命令行，转到 `mongodb-osx-x86_64-enterprise-3.4.10/bin` 下：

    // 启动命令行
    ./mongo
    // 获取当前数据库的名称，默认是 test
    db.getName()
    // 获取全部数据库的名称，
    // 默认有 admin local test 三个数据库，
    // 其中前两个是系统数据库
    show dbs
    // 创建users集合，向集合中插入一条document
    db.users.insert({"name":"name 1",age:21})
    // 查看插入的数据
    db.users.find()
    // 关闭数据库链接
    db.shutdownServer()

三个数据库中 admin 对应管理员权限，最后的“关闭数据库链接”操作需要切换到 admin 才能进行(`use admin`)。命令行是要学一点的，因为有些机器可能就没有界面，不过有界面的时候也不用难为自己，介绍一个可视化数据库工具：[Robo 3T](https://robomongo.org/download)，很方便的就可以链接上，直接上一张图：

![Robo-3T](/articles/mongo-db/img/robo-3t.png)

## 理论

### 附注

Community Server， 社区版，比企业版少一些高级功能

Enterprise Server， 企业版，功能最全，免费
