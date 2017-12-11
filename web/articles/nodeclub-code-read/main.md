# 读 Nodeclub 源码

> 一直想找一个全栈的项目学习一下，最好是已经上线还有好多人在用，而不是某些人写的作业或培训班的 Demo。经过几番挣扎终于找到了一个这样的项目 -- https://github.com/cnodejs/nodeclub。它是 [Node.js 中文论坛](https://cnodejs.org/)的源码，论坛每天都有人更新内容，代码基本稳定但还有小的更新，start 6k+，fork 2k+，1.9k+ 的 commits 从 2012.2.15 到今天历时 5 年多，用的技术也比较全面：EJS、Express、PM2、MongoDB、Redis，除了前端部分比较落后之外这个项目堪称全栈模范开源项目，所以我决定解读这个开源项目的源码，提升自己的编码水平。

## 概述

项目线上地址：https://cnodejs.org/

开源代码 Github 地址：https://github.com/cnodejs/nodeclub

## 启动

    node app.js

## 