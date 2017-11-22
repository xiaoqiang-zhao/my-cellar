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
    
### 附注

Community Server， 社区版，比企业版少一些高级功能

Enterprise Server， 企业版，功能最全，免费
