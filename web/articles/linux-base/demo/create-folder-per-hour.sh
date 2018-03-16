#!/bin/bash

# File: create-folder-per-hour.sh
# Desc: 每小时创建一个文件夹
# History: 2018/01/05 zhaoxiaoqiang First release

tady=$(date +%Y%m%d%H%M)

# mkdir /home/zhaoxiaoqiang/$tady
mkdir /Users/zhaoxiaoqiang/$tady

echo $tady
