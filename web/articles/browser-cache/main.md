# 浏览器缓存

> 前端性能优化必备技能。

## A

## 面试题

来自头条：请列举出三种禁止浏览器缓存的头字段，并写出相应的设置值。

response.setDateHeader("Expires",-1);
response.setHeader("Cache-Control","no-cache"); 
response.setHeader("Pragma","no-cache"); 

https://blog.csdn.net/zyw23zyw23/article/details/70991549

https://blog.csdn.net/u014034854/article/details/50374709

## 参考

https://www.cnblogs.com/lyzg/p/5125934.html

