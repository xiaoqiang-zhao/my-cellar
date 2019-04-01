# Nginx 使用备忘

> 用 Nginx 做代理或前端静态文件服务器是大前端的一个技能，其优点是比 NodeJs 服务更加稳定和简单，Nginx 可以单独使用也可以和 NodeJs 搭配使用解决负载均衡等问题。

## 概述

Nginx 的定位是高性能轻量级 Web 服务器。

## 安装 Nginx

首先确认这些依赖是有的，没有的安装一下: `make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel`。

然后安装 PCRE，PCRE 作用是让 Nginx 支持 Rewrite 功能，如果你不需要 Rewrite 跳过此步也可以。

```shell
# 下载并解压
wget http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz
tar zxvf pcre-8.35.tar.gz
# 安装
cd pcre-8.35
./configure
make && make install
# 查看 pcre 版本，确认安装成功
pcre-config --version
```

最后安装 Nginx。

```shell
# 下载并解压
wget http://nginx.org/download/nginx-1.6.2.tar.gz
tar zxvf nginx-1.6.2.tar.gz
# 安装
cd nginx-1.6.2
./configure --prefix=/usr/local/webserver/nginx --with-http_stub_status_module --with-http_ssl_module --with-pcre=~/src/pcre-8.35
make
make install # 需要 root 权限
# 查看 Nginx 版本，确认安装成功
/usr/local/webserver/nginx/sbin/nginx -v
```

## 配置 Nginx

## 参考

[利用Nginx的上传模块和上传进度模块实现网页上传文件](https://blog.csdn.net/waden/article/details/7040123)

[nodejs与nginx的完美搭配](https://blog.csdn.net/qq_17475155/article/details/66473855)

[用Nginx做NodeJS应用的负载均衡](https://blog.csdn.net/chszs/article/details/43203127)

[Nginx 菜鸟教程](http://www.runoob.com/linux/nginx-install-setup.html)
