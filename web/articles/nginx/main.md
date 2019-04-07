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

## 简单配置 Nginx

创建 Nginx 运行使用的用户 www:

```shell
/usr/sbin/groupadd www 
/usr/sbin/useradd -g www www
```

配置nginx.conf ，将 /usr/local/webserver/nginx/conf/nginx.conf 替换为以下内容

```shell
user www www;
worker_processes 2; #设置值和CPU核心数一致
error_log /usr/local/webserver/nginx/logs/nginx_error.log crit; #日志位置和日志级别
pid /usr/local/webserver/nginx/nginx.pid;
#Specifies the value for maximum file descriptors that can be opened by this process.
worker_rlimit_nofile 65535;
events
{
  use epoll;
  worker_connections 65535;
}
http
{
  include mime.types;
  default_type application/octet-stream;
  log_format main  '$remote_addr - $remote_user [$time_local] "$request" '
               '$status $body_bytes_sent "$http_referer" '
               '"$http_user_agent" $http_x_forwarded_for';
  
#charset gb2312;
     
  server_names_hash_bucket_size 128;
  client_header_buffer_size 32k;
  large_client_header_buffers 4 32k;
  client_max_body_size 8m;
     
  sendfile on;
  tcp_nopush on;
  keepalive_timeout 60;
  tcp_nodelay on;
  fastcgi_connect_timeout 300;
  fastcgi_send_timeout 300;
  fastcgi_read_timeout 300;
  fastcgi_buffer_size 64k;
  fastcgi_buffers 4 64k;
  fastcgi_busy_buffers_size 128k;
  fastcgi_temp_file_write_size 128k;
  gzip on; 
  gzip_min_length 1k;
  gzip_buffers 4 16k;
  gzip_http_version 1.0;
  gzip_comp_level 2;
  gzip_types text/plain application/x-javascript text/css application/xml;
  gzip_vary on;
 
  #limit_zone crawler $binary_remote_addr 10m;
 #下面是server虚拟主机的配置
 server
  {
    listen 8032;#监听端口
    server_name localhost;#域名
    index index.html index.htm index.php;
    root /usr/local/webserver/nginx/html;#站点目录
      location ~ .*\.(php|php5)?$
    {
      #fastcgi_pass unix:/tmp/php-cgi.sock;
      fastcgi_pass 127.0.0.1:9000;
      fastcgi_index index.php;
      include fastcgi.conf;
    }
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|ico)$
    {
      expires 30d;
  # access_log off;
    }
    location ~ .*\.(js|css)?$
    {
      expires 15d;
   # access_log off;
    }
    access_log off;
  }

}
```

检查配置文件 nginx.conf 的正确性命令:

```shell
/usr/local/webserver/nginx/sbin/nginx -t
```

## 启动 Nginx

启动 Nginx 并查看进程:

```shell
/usr/local/webserver/nginx/sbin/nginx
# 用下面命令查看进程
ps -ef | grep nginx
```

Nginx 其他常用命令

```shell
/usr/local/webserver/nginx/sbin/nginx -s reload   # 重新载入配置文件
/usr/local/webserver/nginx/sbin/nginx -s reopen   # 重启 Nginx
/usr/local/webserver/nginx/sbin/nginx -s stop     # 停止 Nginx
```

## Nginx 常用配置

### 静态资源配置

站点的端口的静态资源路径在 `server` 中配置:

```shell
server
  {
    listen 8032;#监听端口
    server_name localhost;#域名
    index index.html index.htm index.php;
    root /usr/local/webserver/nginx/html; #站点目录
```

### 反向代理

正向代理是一个位于客户端和目标服务器之间的代理服务器(中间服务器)。为了从原始服务器取得内容，客户端向代理服务器发送一个请求，并且指定目标服务器，之后代理向目标服务器转交并且将获得的内容返回给客户端。正向代理的情况下客户端必须要进行一些特别的设置才能使用。

反向代理正好相反。对于客户端来说，反向代理就好像目标服务器。并且客户端不需要进行任何设置。客户端向反向代理发送请求，接着反向代理判断请求走向何处，并将请求转交给客户端，使得这些内容就好似他自己一样，一次客户端并不会感知到反向代理后面的服务，也因此不需要客户端做任何设置，只需要把反向代理服务器当成真正的服务器就好了。

正向代理的应用 - 翻墙: 

用户 A 无法访问 facebook，但是能访问服务器 B，而服务器 B 可以访问 facebook。于是用户 A 访问服务器 B，通过服务器 B 去访问 facebook，，服务器 B 收到请求后，去访问 facebook，facebook 把响应信息返回给服务器 B，服务器 B 再把响应信息返回给 A。这样，通过代理服务器 B，就实现了翻墙。

反向代理在线上工程可以做负载均衡，在开发阶段可以处理 Mock 数据和联调接口的自由切换。

### 负载均衡

## 参考

[Nginx 菜鸟教程](http://www.runoob.com/linux/nginx-install-setup.html)

[nginx常用代理配置](https://www.cnblogs.com/fanzhidongyzby/p/5194895.html)

[利用Nginx的上传模块和上传进度模块实现网页上传文件](https://blog.csdn.net/waden/article/details/7040123)

[nodejs与nginx的完美搭配](https://blog.csdn.net/qq_17475155/article/details/66473855)

[用Nginx做NodeJS应用的负载均衡](https://blog.csdn.net/chszs/article/details/43203127)
