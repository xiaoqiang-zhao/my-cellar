# Python 学习笔记

> 多学个东西。

## 概述

Python ，诞生于 1989，是一种跨平台的计算机程序设计语言，语言类型为”解释型脚本“，既支持面向过程的编程也支持面向对象的编程。

Python 在执行时，首先会将 .py 文件中的源代码编译成 Python 的 byte code（字节码），然后再由 Python Virtual Machine（Python虚拟机）来执行这些编译好的 byte code。

Python 本身被设计为可扩充的。并非所有的特性和功能都集成到语言核心。Python 提供了丰富的 API 和工具，以便程序员能够轻松地使用 C 语言、C++、Cython 来编写扩充模块。Python 编译器本身也可以被集成到其它需要脚本语言的程序内。因此，很多人还把Python作为一种“胶水语言”（glue language）使用。

主要用途:
- Web 开发
- 科学计算和统计
- 人工智能
- 桌面界面开发
- 网络爬虫

缺点: 
1. 因为是解释型语言，相比C，运行速度慢;
2. 代码不能加密。

## 快读入门

当前稳定版: 3.8，Mac 预装了 Python，执行 `python -V`，查看版本。如果版本太低去官网下载最新稳定版: https://www.python.org/downloads/，直接就是 [pkg](https://www.python.org/ftp/python/3.8.3/python-3.8.3-macosx10.9.pkg) 文件，傻瓜式安装。

安装完成后会弹出安装目录，点击 IDLE 可以直接进入 Python 命令行窗口，输入 `print("Hello world!")` 回车，第一行 Python 命令就执行了。用 `exit()` 退出命令行。

你还可以把代码写进文件:

```python
# 01-hello-world.py
print("Hello world!")
```

在命令行执行 `python ./01-hello-world.py` 同样可以输出结果。

脚本语言没有复杂的数据类型定义，Python 更是采用了 4 个空格的缩进作为逻辑块分割，我们多写几行代码:

```python
# 02-if-else.py
a = 1
if a > 0:
    print("a 为整数")
else:
    print("a 不为整数")
```

IDE 可以用我熟悉的 VS Code，可以断点调试。(pycharm 也是不错的选择)

## VS Code

给 VS Code 装个插件就可以直接运行 .py 文件了。

## 解析器

整个Python语言从规范到解释器都是开源的，所以理论上，只要水平够高，任何人都可以编写Python解释器来执行Python代码（当然难度很大）。事实上，确实存在多种Python解释器。

我们用官方版本的解释器 CPython。这个解释器是用C语言开发的，所以叫CPython。

## Python 基础

支持整数、浮点数、字符串(包括多行字符串)、布尔值、空值(None)、常量.

```python
# 赋值后直接改变数据类型
a = 123
print(a)
a = 'ABC'
print(a)

# 不能改变数据类型
int a = 123;
a = "ABC"; # 错误：不能把字符串赋给整型变量

# 03-data-type.py
s = '''
line 1
line 2
line 3
'''
print(s)
```

数据集 list

```python
classmates = ['Michael', 'Bob', 'Tracy']
len(classmates)
# 输出 3

classmates[0]
# 'Michael'

classmates[-1]
# 'Tracy'

classmates.append('Adam')
# ['Michael', 'Bob', 'Tracy', 'Adam']

classmates.insert(1, 'Jack')
# ['Michael', 'Jack', 'Bob', 'Tracy', 'Adam']
```

要删除 list 末尾的元素，用 `pop()` 方法。

要删除指定位置的元素，用 `pop(i)` 方法。

list 中可放置数据类型不同的元素。

另一种有序列表叫元组：tuple。tuple 和 list 非常类似，但是 tuple 一旦初始化就不能修改。

```python
classmates = ('Michael', 'Bob', 'Tracy')

# 三种定义方式
a = ()
d = (3,)
e = (4,5,6)

# 间接修改
t = ('a', 'b', ['A', 'B'])
t[2][0] = 'X'
```

条件判断

```python
age = 20
if age >= 6:
    print('teenager')
elif age >= 18:
    print('adult')
else:
    print('kid')
```

for in 循环

```python
names = ['Michael', 'Bob', 'Tracy']
for name in names:
    print(name)
```

`range(i)` 生成的序列是从 0 开始小于 i 的整数：

```python
sum = 0
for x in range(101):
    sum = sum + x
print(sum)
```

while 循环

```python
sum = 0
n = 99
while n > 0:
    sum = sum + n
    n = n - 2
print(sum)
```

`break` 退出循环，`continue` 跳过当前次循环。

Python 内置了字典：`dict` 的支持，dict 全称 dictionary，在其他语言中也称为 map，使用键-值（key-value）存储，具有极快的查找速度。

```python
d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
d['Michael']
```

把数据放入dict的方法，除了初始化时指定外，还可以通过key放入。

```python
d['Adam'] = 67
```

如果key不存在，dict就会报错。要避免 key 不存在的错误，有两种办法，一是通过 in 判断 key 是否存在；二是通过 dict 提供的 get() 方法，如果 key 不存在，可以返回 None，或者自己指定的 value：

```python
d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
'Thomas' in d
# false
d.get('Thomas')
# None
d.get('Thomas', -1)
# -1
```

和 list 比较，dict 有以下几个特点：

查找和插入的速度极快，不会随着 key 的增加而变慢；
需要占用大量的内存，内存浪费多。
而 list 相反：

查找和插入的时间随着元素的增加而增加；
占用空间小，浪费内存很少。

set和dict类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在set中，没有重复的key。要创建一个set，需要提供一个list作为输入集合。

```python
s = set([1, 2, 3])
# s 的值为 {1, 2, 3}

# 添加元素到 set 中
s.add(4)

# 删除 set 中的元素
s.remove(4)
```

两个set可以做数学意义上的交集、并集等操作。

```python
s1 = set([1, 2, 3])
s2 = set([2, 3, 4])

s1 & s2
# {2, 3}

s1 | s2
# {1, 2, 3, 4}
```

再议不可变对象，str 是不变对象，而 list 是可变对象。

```python
a = ['c', 'b', 'a']
a.sort()
a
['a', 'b', 'c']

a = 'abc'
b = a.replace('a', 'A')
b
# 'Abc'
a
# 'abc'
```

## 函数

Python内置了很多有用的函数，我们可以直接调用。

要调用一个函数，需要知道函数的名称和参数，比如求绝对值的函数abs，只有一个参数。可以直接从Python的官方网站查看文档：http://docs.python.org/3/library/functions.html#abs


定义一个函数要使用 def 语句，依次写出函数名、括号、括号中的参数和冒号 :，然后，在缩进块中编写函数体，函数的返回值用 return 语句返回。

```python
def my_abs(x):
    if x >= 0:
        return x
    else:
        return -x
```

如果想定义一个什么事也不做的空函数，可以用pass语句：

```python
def nop():
    pass
```

数据类型检查可以用内置函数 isinstance() 实现。对参数类型做检查，只允许整数和浮点数类型的参数。

```python
def my_abs(x):
    if not isinstance(x, (int, float)):
        raise TypeError('bad operand type')
    if x >= 0:
        return x
    else:
        return -x
```

返回多个值。

```python
import math

def move(x, y, step, angle=0):
    nx = x + step * math.cos(angle)
    ny = y - step * math.sin(angle)
    return nx, ny

x, y = move(100, 100, 60, math.pi / 6)
```

参数默认值。

```python
def power(x, n=2):
    s = 1
    while n > 0:
        n = n - 1
        s = s * x
    return s
```

可变参数。可变参数允许你传入0个或任意个参数，这些可变参数在函数调用时自动组装为一个 tuple。

```python
def calc(*numbers):
    sum = 0
    for n in numbers:
        sum = sum + n * n
    return sum
```

## 高级特性

切片。

```python
L = ['Michael', 'Sarah', 'Tracy', 'Bob', 'Jack']
print(L[0:3])
# ['Michael', 'Sarah', 'Tracy']

print(L[-2:])
# ['Bob', 'Jack']
```

迭代。

```python
for i, value in enumerate(['A', 'B', 'C']):
```

列表生成式。

```python
a = list(range(1, 11))
print(a)
# [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

b = [x * x for x in range(1, 11)]
print(b)
# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

c = [x * x for x in range(1, 11) if x % 2 == 0]
print(c)
# [4, 16, 36, 64, 100]
```

generator 生成器。每次调用 next(g)，就计算出g的下一个元素的值，直到计算到最后一个元素，没有更多的元素时，抛出 StopIteration 的错误。

```python
g = (x * x for x in range(10))
next(g)
# 0
for n in g:
    print(n)
```

## 函数式编程

`map()` 函数接收两个参数，一个是函数，一个是 `Iterable`，map 将传入的函数依次作用到序列的每个元素，并把结果作为新的 Iterator 返回。

```python
def f(x):
    return x * x

r = map(f, [1, 2, 3, 4, 5, 6, 7, 8, 9])
# [1, 4, 9, 16, 25, 36, 49, 64, 81]
```

reduce。

```python
from functools import reduce
def fn(x, y):
    return x * 10 + y

a = reduce(fn, [1, 3, 5, 7, 9])
print(a)
# 13579
```

filter。

```python
def is_odd(n):
    return n % 2 == 1

list(filter(is_odd, [1, 2, 4, 5, 6, 9, 10, 15]))
# 结果: [1, 5, 9, 15]
```

sorted。

```python
# 按成绩从高到低排序：

L = [('Bob', 75), ('Adam', 92), ('Bart', 66), ('Lisa', 88)]

def by_score(t):
    return t[1]

L2 = sorted(L, key=by_score)
print(L2)
# [('Bart', 66), ('Bob', 75), ('Lisa', 88), ('Adam', 92)]
```

高阶函数除了可以接受函数作为参数外，还可以把函数作为结果值返回。闭包。

```python
def lazy_sum(*args):
    ax = None
    def sum():
        nonlocal ax
        if ax != None:
            print('cache')
            return ax
        else:
            ax = 0
            for n in args:
                ax = ax + n
            print('count')
            return ax
    return sum

sum = lazy_sum(1, 2)

print(sum())
# count 3
print(sum())
# cache 3
```

匿名函数 lambda。

```python
list(map(lambda x: x * x, [1, 2, 3, 4, 5, 6, 7, 8, 9]))
[1, 4, 9, 16, 25, 36, 49, 64, 81]
```

在代码运行期间动态增加功能的方式，称之为“装饰器”（Decorator）。

```python
def log(func):
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper

@log
def now():
    print('2015-3-25')

now()
```

其实就是给函数加一层执行代码。

偏函数: 通过设定参数的默认值，可以降低函数调用的难度。而偏函数也可以做到这一点。

```python
import functools
def int2(x, base=2):
    return int(x, base)

a = int2('10')
int3 = functools.partial(int, base=8)
b = int3('10')
print(a, b)
# 2 8
```

## 模块

编写一个hello的模块：

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

' a test module '

__author__ = 'Xiaoqiang Zhao'

import sys

def test():
    args = sys.argv
    if len(args)==1:
        print('Hello, world!')
    elif len(args)==2:
        print('Hello, %s!' % args[1])
    else:
        print('Too many arguments!')

if __name__=='__main__':
    test()
```

```python

```

```python

```

```python

```


## Django

Django 已经成为 web 开发者的首选框架

## 参考

官网: https://www.python.org/
Python 新手入门引导: https://zhuanlan.zhihu.com/p/25824007
廖雪峰 Python 教程: https://www.liaoxuefeng.com/wiki/1016959663602400
