#!/bin/bash

# File: sh02.sh
# Desc: 创建三个文件夹，前缀由用户输入，后缀是昨天今天明天的日期
# History: 2017/12/26 zhaoxiaoqiang First release

# 获取用户输入
read -p "请输入文件名前缀:" inputFilename
# 为了避免随意按 Enter，分析是否设置
preFilename=${inputFilename:-"defaultFilename"}
# 利用 date 取得所需文件名
yestady=$(date --date='1 days ago' +%Y%m%d)
tady=$(date +%Y%m%d)
tomorrow=$(date -d tomorrow +%Y%m%d)

yestadyFile=${preFilename}-${yestady}
tadyFile=${preFilename}-${tady}
tomorrowFile=${preFilename}-${tomorrow}
# 创建文件
touch "$yestadyFile"
touch "$tadyFile"
touch "$tomorrowFile"