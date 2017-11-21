# Redis 学习笔记

> 早闻大名，开始学习，下面是学习过程留下的笔记，力图用最少的时间，了解 80% 的内容。这个笔记也是以书《Redis Action》为主线来进行，会加一些官网和博客中的内容。

## 初识

2009 年意大利程序员 Salvatore Sanfilippo 为了用一台服务器(有限的资源)解决高并发存取而开发的一种非关系数据库。

此数据库的定位是非关系型键值数据库，比分布式缓存服务器 memcached 更灵活，数据类型也更多，memcached 只提供字符串类型。可以简单的理解成只有一张表，并且这张表只有两个字段 key 和 value 的轻量数据库，简化功能换取速度。随着社区的推动，Redis 在分布式上也走出了自己的道路。

Redis 的适用场景是快速写入和读取结构简单的数据。

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

一套命令下来， Redis 版的 Hello world 就完成了。

## 数据类型

一共五种，我们挨个看：

### 字符串 - Strings

其实是字符串和数字，包括整型和浮点，下面简称字符串类型。

    // 增改
    set foo bar
    // 查
    get foo
    // 删
    del foo

### 列表 - Lists

有序存储多个字符串，字符串可重复

    // 右插入，可存在重复元素
    rpush my-list item1 item2 item1
    // 左插入
    lpush my-list item0
    // 获取列表的指定区间，-1 表示获取全部
    lrange my-list 0 -1
    // 获取列表的其中一个字符串
    lindex my-list 2
    // 从列表弹出一个元素，并返回这个元素的值
    lpop my-list

还有其他的命令这里先不展开...

### 集合 - Sets

有序存储多个字符串，字符串不可重复

    // 添加元素到集合中，成功(插入已存在的元素视为不成功)返回 1，否则返回 0
    sadd my-set item0 item1
    // 获取集合的全部元素
    smembers my-set
    // 查看某个元素是否在集合中，存在返回 1，否则返回 0
    sismember my-set item1
    // 删除集合中的某元素，删除成功返回 1，否则返回 0
    srem my-set item1

还有一些交集并集等操作这里也不展开...

### 散列 - Hashes

存储多个键值之间的映射。

    // 添加/更新 键值对到散列
    hset my-hash name longze
    // 获取所有键值对
    hgetall my-hash
    // 删除键值对
    hdel my-hash name
    // 获取散列里面某个键的值
    hget my-hash name


### 有序集合 - Sorted sets

和散列一样也用来存放键值对，不同之处是：

- 有序集合的键被称为成员 member，每个成员独一无二；
- 有序集合的值被称为分值 score，分值必须为浮点数。

    // 添加键值对，注意先值后键，值必须为浮点，键任意
    zadd my-sorted-set 100 member0
    // 读取全部键值
    zrange my-sorted-set 0 -1 withscores
    // 根据分值来获取
    zrangebyscore my-sorted-set 0 100 withscores
    // 移除键值对
    zrem my-sorted-set mem0

## 简单投票系统

如果要做系统，那么选一种服务器语言是必不可少的步骤，业界推荐的是 Python，《Redis Action》中用的也是 Python，我这里用 Node.js 来写。包[redis](https://www.npmjs.com/package/redis) 能满足我们的全部需求。


