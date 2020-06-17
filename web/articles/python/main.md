# Python 学习笔记

> 多学个东西。

## 概述

Python ，诞生于 1989，是一种跨平台的计算机程序设计语言，语言类型为”解释型脚本“，既支持面向过程的编程也支持面向对象的编程。

Python 在执行时，首先会将 .py 文件中的源代码编译成 Python 的 byte code（字节码），然后再由 Python Virtual Machine（Python虚拟机）来执行这些编译好的 byte code。

Python 本身被设计为可扩充的。并非所有的特性和功能都集成到语言核心。Python 提供了丰富的 API 和工具，以便程序员能够轻松地使用 C 语言、C++、Cython 来编写扩充模块。Python 编译器本身也可以被集成到其它需要脚本语言的程序内。因此，很多人还把Python作为一种“胶水语言”（glue language）使用。

主要用途:
- Web 和 Internet开发
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
a = 1
if a > 0:
    print("a 为整数")
else:
    print("a 不为整数")
```

IDE 可以用我熟悉的 VS Code，可以断点调试。

## Django

Django 已经成为 web 开发者的首选框架
