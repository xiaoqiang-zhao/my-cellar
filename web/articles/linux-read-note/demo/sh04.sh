#!/bin/bash

# File: sh04.sh
# Desc: 获取 8080 端口及以后未被占用的端口
# History: 2017/12/28 zhaoxiaoqiang First release
port=8080
while [ "$(netstat -tuln | grep "$port")" != "" ]
do
    port=$(($port+1))
done
echo $port'端口没有被占用'

exit $port