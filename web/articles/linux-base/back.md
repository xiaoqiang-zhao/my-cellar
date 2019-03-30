# 备份部分段落

## 系统安装

装机教程传送: [https://linux.cn/article-1471-1.html](https://linux.cn/article-1471-1.html)。如果想要图形化界面记得选择 GNOME，时间大约 40分钟。

如果装失败了需要重新在 U 盘里写入安装引导程序和系统，可能遇到 U 盘无法格式化的情况，解决办法：[http://www.sunyuping.cn/2017/02/mac%E4%B8%8B%E7%A3%81%E7%9B%98%E5%B7%A5%E5%85%B7%E6%97%A0%E6%B3%95%E6%A0%BC%E5%BC%8F%E5%8C%96u%E7%9B%98%E7%9A%84%E6%97%B6%E5%80%99%E4%BD%BF%E7%94%A8%E7%BB%88%E7%AB%AFdiskutil%E5%91%BD%E4%BB%A4/](http://www.sunyuping.cn/2017/02/mac%E4%B8%8B%E7%A3%81%E7%9B%98%E5%B7%A5%E5%85%B7%E6%97%A0%E6%B3%95%E6%A0%BC%E5%BC%8F%E5%8C%96u%E7%9B%98%E7%9A%84%E6%97%B6%E5%80%99%E4%BD%BF%E7%94%A8%E7%BB%88%E7%AB%AFdiskutil%E5%91%BD%E4%BB%A4/)

CentOS 适合做服务器，用命令行来操作66的；Ubuntu 适合做开发，界面支持较好。比较郁闷的是装了数次 CentOS 都没装成功图形界面(命令行倒是一次成功而且非常快)，装 Ubuntu 很顺利一次性成功。

## 结语

终于看完了...

看这个类型的书就要定个计划，不间断的一口气看完，我看这本书前后用了不到一个月看了三遍，每天坚持看一章。具体看书的过程大概是三遍，第一遍快速看，不最求细节，知道讲了什么，我需要从中提取什么信息进我的认知框架，比如进程管理这一章第一遍先知道有进程有前台、后台、脱机的概念，这些概念为了解决什么问题，用的什么命令解决的，然后画一些标记。第二遍开始打开电脑，假设我遇到了一个问题，要怎么利用这一章提到的东西来解决，这其中可能会遇到与书上有出入的地方，也可能遇到一些书中并未提及的问题，结合 Google 将解决问题的过程记录到笔记中。最后再过一遍看看有什么漏掉的没有，这一次就像一个有经验的人看同行写的书。

## 关于作者

鸟哥本人的资料在网络上比较少，鸟哥本命蔡德明，现在在昆山科技大学任教。

更多内容：

http://linux.vbird.org/vbird/vbird4.php

https://news.cnblogs.com/n/517869/

还有个 PHP 方面的鸟哥，本名惠新宸，前百度员工，大搜上还有其代码在跑，现在在链家。

这里有一篇专访：

http://mp.weixin.qq.com/s/-RPRQ78k5F-ZoVv8IJC_zg

## zlib

ZLIB is designed to be a free, general-purpose(多用途的), legally(合法的) unencumbered(没有阻碍的) - that is, not covered by any patents(专利) - lossless data-compression library for use on virtually any computer hardware and operating system. The zlib data format is itself portable across platforms. Unlike the LZW compression method used in Unix compress(1) and in the GIF image format, the compression(压缩) method currently used in zlib essentially never expands the data. (LZW can double or triple the file size in extreme cases). ZLIB's memory footprint is also independent of the input data and can be reduced, if necessary, at some cost in compression.

## zlib-devel

The zlib-devel package contains the header files and libraries needed to develop programs that use the zlib compression and decompression library.

## libtool

The libtool package contains the GNU libtool, a set of shell scripts which automatically configure UNIX and UNIX-like architectures to generically build shared libraries. Libtool provides(提供) a consistent, portable interface which simplifies(简化) the process of using shared libraries. If you are developing programs which will use shared libraries, you should install libtool.

## openssl

The OpenSSL Project is a collaborative(合作的) effort(成就) to develop a robust(健壮的), commercial-grade(商品级), full-featured(全功能的), and Open Source toolkit(工具包) implementing(实现) the Secure(安全的) Sockets Layer (SSL v2/v3) and Transport Layer Security (TLS v1) protocols with full-strength cryptography world-wide. The project is managed by a worldwide community of volunteers that use the Internet to communicate, plan, and develop the OpenSSL tookit and its related documentation.

SSL是一种国际标准的加密及身份认证通信协议，您用的浏览器就支持此协议。SSL（Secure Sockets Layer）最初是由美国Netscape公司研究出来的，后来成为了Internet网上安全通讯与交易的标准。

OpenSSL -- 一个C语言函数库，是对SSL协议的实现。

[SSL和SSH和OpenSSH，OpenSSL有什么区别](https://www.cnblogs.com/foohack/p/4103212.html)
