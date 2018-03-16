#!/bin/bash

# File: sh05.sh
# Desc: 函数示例
# History: 2017/12/29 zhaoxiaoqiang First release

# 声明函数
# 函数的参数用 $1 $2 依次代替
function fun() {
    r=$(($1+1))
    # 注意用 echo，用 return 居然拿不到返回数值
    echo $r
    # return $r
    # 神奇：如果你只是调用函数而不赋值，那么这里的 echo 是打印
    #      如果你调用函数，并把返回值赋给了变量，那么这里的 echo 是 return
}

# 直接调用
fun 100
# 100

# 赋值
result=$(fun 200)

echo "result:"$result
# result:201
