# 素材

想到一个绝佳的比喻:

Apache 是一辆车，上面可以装一些东西如 html 等，但是不能装水，要装水必须要有容器（桶），而这个桶也可以不放在卡车上，那这个桶就是 Tomcat。


## 我的 Nginx 备忘

配置路径:
/usr/local/webserver/nginx/conf

访问地址:
http://10.99.195.12:8032/#/

静态文件路径:
/usr/local/webserver/nginx/html

拷贝文件
```shell
cp index.html /usr/local/webserver/nginx/html/
cp -r ./static /usr/local/webserver/nginx/html/
cp -r ./dll /usr/local/webserver/nginx/html/
```

软链
