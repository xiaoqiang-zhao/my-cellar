# 素材

想到一个绝佳的比喻:

Apache 是一辆车，上面可以装一些东西如 html 等，但是不能装水，要装水必须要有容器（桶），而这个桶也可以不放在卡车上，那这个桶就是 Tomcat。

## 我的 Nginx 备忘

配置路径:
/usr/local/webserver/nginx/conf/nginx.conf

访问地址:
http://10.99.195.12:8033/#/

### 静态文件

静态文件路径:
/usr/local/webserver/nginx/html

拷贝文件(拷贝需要 root 权限)
```shell
cp /home/zhaoxiaoqiang/code/pacs_b/dist/index.html /usr/local/webserver/nginx/html/
cp -r /home/zhaoxiaoqiang/code/pacs_b/dist/static /usr/local/webserver/nginx/html/
cp -r /home/zhaoxiaoqiang/code/pacs_b/dist/dll /usr/local/webserver/nginx/html/
```

走配置
/usr/local/webserver/nginx/conf/nginx.conf
```config
user 用户名 用户组;
server
  {
    # root /usr/local/webserver/nginx/html;#站点目录
    root /home/zhaoxiaoqiang/code/pacs_b/dist;
  }
```
重新载入配置文件
/usr/local/webserver/nginx/sbin/nginx -s reload

软链
dist 目录:
/home/zhaoxiaoqiang/code/pacs_b/dist/
软链方案验证失败
整体 html 到 dist 发现不能有不同的命名
html 下的 index.html、dll、static 分别到 dist 也运行不通

### 反向代理配置

pass rewrite

```config
 server
  {
    # 监听端口
    listen 8033;
    # 域名
    server_name localhost;
    # 首页设定
    index index.html index.htm index.php;
    # 方向代理路径
    location / {
      proxy_pass http://zp_server1;
    }
    #禁止访问 .jaxxx 文件
    location ~ /\.ja {
      deny all;
    }
  }
```

详解:

= 开头表示精确匹配
```config
location = / {
  #规则A
}
location = /login {
  #规则B
}
```

^~ 开头表示uri以某个常规字符串开头
```config
location ^~ /static/ {
  #规则C
}
```

~ 开头表示区分大小写的正则匹配
```config
location ~ \.(gif|jpg|png|js|css)$ {
  #规则D
}
```

~*  开头表示不区分大小写的正则匹配
```config
location ~* \.png$ {
  #规则E
}
```

!~和!~*分别为区分大小写不匹配及不区分大小写不匹配 的正则
```config
location !~ \.xhtml$ {
  #规则F
}
location !~* \.xhtml$ {
  #规则G
}
```

/ 通用匹配，任何请求都会匹配到。
```config
location / {
  #规则H
}
```
