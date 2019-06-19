# Nginx 使用备忘

> 用 Nginx 做代理或前端静态文件服务器是大前端的一个技能，其优点是比 NodeJs 服务更加稳定和简单，Nginx 可以单独使用也可以和 NodeJs 搭配使用解决负载均衡等问题。

## 概述

Nginx 的定位是高性能轻量级 Web 服务器。

## 安装 Nginx

首先确认这些依赖是有的，没有的安装一下: `make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel`。

然后安装 PCRE，提供了正则表达式的解析，Nginx 在配置路径时支持正则表达式就依赖于这个库。

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

## 启动 Nginx

root 权限下创建 Nginx 运行使用的用户 www:

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
      # fastcgi_pass unix:/tmp/php-cgi.sock;
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

启动 Nginx 并查看进程:

```shell
/usr/local/webserver/nginx/sbin/nginx
# 用下面命令查看进程
ps -ef | grep nginx
```

进程信息大体是这样的:

```shell
nobody    1587  1584  0  2018 ?        00:07:05 nginx: worker process            
root     17083     1  0 16:59 ?        00:00:00 nginx: master process /usr/local/webserver/nginx/sbin/nginx
500      17084 17083  0 16:59 ?        00:00:00 nginx: worker process         

500      17085 17083  0 16:59 ?        00:00:00 nginx: worker process         

root     18545 14071  0 17:00 pts/1    00:00:00 grep nginx
```

Nginx 用一个 master 进程管理多个 worker 进程。master 负责监控管理 worker 进程。worker 进程之间通过共享内存、原子操作等一些进程通信机制来实现负载均衡。Nginx 其他常用命令:

```shell
/usr/local/webserver/nginx/sbin/nginx -s reload   # 重新载入配置文件
/usr/local/webserver/nginx/sbin/nginx -s reopen   # 重启 Nginx
/usr/local/webserver/nginx/sbin/nginx -s stop     # 停止 Nginx
/usr/local/webserver/nginx/sbin/nginx -s quit     # 优雅的停止 Nginx
```

其中的 `-s` 参数代表强者停止，忽略正在进行的任务。

注: 所谓的优雅停止 Nginx 就是首先关闭端口的监听，停止接收新请求，然后把当前正在处理的请求全部处理完，最后再退出进程。

## Nginx 的配置

Nginx 拥有大量官方发布的模块和第三方模块，这些已有的模块可以帮助我们实现 Web 服务器上很多的功能。使用这些模块时，仅需要增加或修改一些配置。默认配置文件路径: `/usr/local/webserver/nginx/conf/nginx.conf`。改完配置执行重新载入配置命令生效: `/usr/local/webserver/nginx/sbin/nginx -s reload`。

### 基础配置

启动端口配置:

```config
server
  {
    listen 8033; # 监听端口
    server_name localhost; # 域名
  }
```

静态资源配置:

一般前端的静态资源在不同用户名下，下面是原始配置:
```config
server
  {
    root /usr/local/webserver/nginx/html; #站点目录
  }
```

可以改为某个用户下的某个项目:
```config
server
  {
    root /home/用户名/code/项目名/dist; #站点目录
  }
```

需要注意的是如果不是同在 root 下，需要改配置文件首行的 `user` 配置:
```config
user 用户名 用户组;
worker_processes 2; #设置值和CPU核心数一致
```

如果静态资源和 Nginx 不在一台机器上可以使用反向代理来指定资源。

### 多站点

如果你想启动多个站点，配置多个 server 就可以实现，通过不同的端口提供多个服务:

```config
	server {
		listen 8001;
    server_name localhost;
    index index.html index.htm index.php;
		root /home/dist1;
	}

 	server {
		listen 8002;
    server_name localhost;
    index index.html index.htm index.php;
    root /home/dist2;
	}
```

### 反向代理

正向代理是一个位于客户端和目标服务器之间的代理服务器(中间服务器)。为了从原始服务器取得内容，客户端向代理服务器发送一个请求，并且指定目标服务器，之后代理向目标服务器转交并且将获得的内容返回给客户端。正向代理的情况下客户端必须要进行一些特别的设置才能使用。

反向代理正好相反。对于客户端来说，反向代理就好像目标服务器。并且客户端不需要进行任何设置。客户端向反向代理发送请求，接着反向代理判断请求走向何处，并将请求转交给客户端，使得这些内容就好似他自己一样，一次客户端并不会感知到反向代理后面的服务，也因此不需要客户端做任何设置，只需要把反向代理服务器当成真正的服务器就好了。

正向代理的应用 - 翻墙: 

用户 A 无法访问 facebook，但是能访问服务器 B，而服务器 B 可以访问 facebook。于是用户 A 访问服务器 B，通过服务器 B 去访问 facebook，，服务器 B 收到请求后，去访问 facebook，facebook 把响应信息返回给服务器 B，服务器 B 再把响应信息返回给 A。这样，通过代理服务器 B，就实现了翻墙。

反向代理在线上工程可以做负载均衡，在开发阶段可以处理 Mock 数据和联调接口的自由切换。

比如我们将某接口反向代理到一个服务上:
```config
server {
  location /api/captcha {
    proxy_pass http://172.23.232.168:8001;
  }
}
```

也可以将全部静态资源反向代理到一个服务器上:
```config
location \.(html|gif|jpg|png|js|css)$ {
  proxy_pass http://10.99.195.12:8001;
}
```

对于不直接输入 `ip:port/index.html` 的请求，通过 `index index.html index.htm index.php;` 配置也可以直接导到 index.html 资源上。

使用 nginx 配置 https 需要知道几点:
- HTTPS 的固定端口号是 443，不同于 HTTP 的 80 端口
- SSL 标准需要引入安全证书，所以在 nginx.conf 中你需要指定证书和它对应的 key

其他和 http 反向代理基本一样，只是在 Server 部分配置有些不同。

```config
#HTTP服务器
server {
    #监听443端口。443为知名端口号，主要用于HTTPS协议
    listen       443 ssl;

    #定义使用www.xx.com访问
    server_name  www.helloworld.com;

    #ssl证书文件位置(常见证书文件格式为：crt/pem)
    ssl_certificate      cert.pem;
    #ssl证书key位置
    ssl_certificate_key  cert.key;

    #ssl配置参数（选择性配置）
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    #数字签名，此处使用MD5
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
        root   /root;
        index  index.html index.htm;
    }
}
```

### HTML5 History 模式

首先需要将页面路由以固定的单词开头，比如 "/pages"，然后将全部以 "/pages" 开头的请求打到 index.html 上，配置如下:

```config
location /pages{
    try_files $uri /index.html;
}
```

### 负载均衡

Nginx 负载均衡是通过 upstream 模块来实现的，内置实现了三种负载策略:

一、轮循（默认），Nginx 根据请求次数，将每个请求按比例分配到每台服务器。

```config
http {
  # 设定负载均衡的服务器列表
  upstream load_balance_server {
      # weigth参数表示权值，权值越高被分配到的几率越大
      server 192.168.1.11:3001   weight=1;
      server 192.168.1.11:3002   weight=5;
  }
}
```

二、最少连接，将请求分配给连接数最少的服务器。Nginx会统计哪些服务器的连接数最少。

三、IP Hash，绑定处理请求的服务器。第一次请求时，根据该客户端的IP算出一个HASH值，将请求分配到集群中的某一台服务器上。后面该客户端的所有请求，都将通过HASH算法，找到之前处理这台客户端请求的服务器，然后将请求交给它来处理。

后两种策略，配置稍微复杂这里不展开，想了解详细移步参考文章。

## 问题排查思路

凡事有意外，很多时候我们配置了 Nginx 却没达到想要的效果，这里提供一种排查的思路:

首先，确保你最简配的版本能正常启动和运行。

其次，看看配置是否生效，你可以通过修改端口等手段快速判断。如果确实没生效，最有可能的原因是改完配置没有 reload，或者配置的语法出了错误，注意查看控制台输出的日志。

最后，你可能遇到没有报错但是不起作用的情况，常见的有代理不能正确返回和文件路径不能正确解析等问题，这时需要你打看日志看看问题出在哪里。一般日志在 /var/log/nginx/ 下，在 access.log 与 error.log 中可以看到请求失败的描述信息。

## 参考

[Nginx 菜鸟教程](http://www.runoob.com/linux/nginx-install-setup.html)

[实用的 Nginx 极简教程](https://zhuanlan.zhihu.com/p/58962596)

[nginx常用代理配置](https://www.cnblogs.com/fanzhidongyzby/p/5194895.html)

[利用Nginx的上传模块和上传进度模块实现网页上传文件](https://blog.csdn.net/waden/article/details/7040123)

[nodejs与nginx的完美搭配](https://blog.csdn.net/qq_17475155/article/details/66473855)

[用Nginx做NodeJS应用的负载均衡](https://blog.csdn.net/chszs/article/details/43203127)

[Nginx负载均衡配置](https://blog.csdn.net/xyang81/article/details/51702900)
