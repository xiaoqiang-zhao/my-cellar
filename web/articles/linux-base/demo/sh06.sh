#!/bin/bash

# File: sh06.sh
# Desc: 将 output 重命名为 dist
# History: 2019/07/08 zhaoxiaoqiang First release

# 判断 dist 文件夹是否存在，如果存在将其移除
# 注意 -d 前面要有空格，还可以 ! -d dist 取反
if [ -d dist ]; then
  echo 'dist 文件夹存在'
  rm -rf dist
  echo '删除 dist 文件夹'
fi

# output 重命名为 dist
mv output dist
echo 'output 重命名为 dist'
