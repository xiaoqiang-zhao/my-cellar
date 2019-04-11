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

### 反向代理

pass rewrite
