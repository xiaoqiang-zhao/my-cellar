#!/bin/bash

# File: sh03.sh
# Desc: if...then Demo, 判断端口是否暂用
# History: 2017/12/28 zhaoxiaoqiang First release

# 8080 端口被占用
if [$(netstat -tuln | grep "8080") == '']; then
    echo '8080 端口没有被占用'
elif [$(netstat -tuln | grep "8081") == ''];then 
    echo '8081 端口没有被占用'
else
    echo '8080 和 8081 端口都被占用'
fi
