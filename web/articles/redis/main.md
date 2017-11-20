# Redis 学习笔记

> 早闻大名，开始学习，下面是学习过程留下的笔记，力图用最少的时间，了解 80% 的内容。

## 初识

2009 年意大利程序员 Salvatore Sanfilippo 为了用一台服务器(有限的资源)解决高并发存取而开发的一种非关系数据库。

此数据库的定位是非关系型键值数据库，比分布式缓存服务器 memcached 更灵活，数据类型也更多，memcached 只提供字符串类型。可以简单的理解成只有一张表，并且这张表只有两个字段 key 和 value 的轻量数据库，简化功能换取速度。随着社区的推动，Redis 在分布式上也走出了自己的道路。

## 安装&运行

    // 选取安装目录
    cd /usr/local/
    // 下载
    sudo wget http://download.redis.io/releases/redis-4.0.2.tar.gz
    // 解压
    tar xzf redis-4.0.2.tar.gz
    // 进入目录
    cd redis-4.0.2
    // 编译
    make
    // 安装
    make install
    // 启动
    redis-server
    // 启动 redis cli (需要在新命令行窗口)
    redis-cli
    // 插入数据
    set foo bar
    // 获取数据
    get foo

参考：https://redis.io/download

一套命令下来， Redis 版的 Hello world 就完成了。先留下两个问题：

1、退出 redis-server 后重新启动，之前 set 的数据找不到了，怎么持久化？

2、搜索怎么做？

