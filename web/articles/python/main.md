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

整个 Python 语言从规范到解释器都是开源的，所以理论上，只要水平够高，任何人都可以编写 Python 解释器来执行 Python 代码（当然难度很大）。事实上，确实存在多种 Python 解释器。

我们用官方版本的解释器 CPython。这个解释器是用 C 语言开发的，所以叫 CPython。

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

遗留问题: 在大项目中，多层目录怎么引入自定义模块？

当我们试图加载一个模块时，Python会在指定的路径下搜索对应的.py文件，如果找不到，就会报错。默认情况下，Python解释器会搜索当前目录、所有已安装的内置模块和第三方模块，搜索路径存放在sys模块的path变量中

```python
import sys
sys.path
# ['/Library/Developer/CommandLineTools/Library/Frameworks/Python3.framework/Versions/3.8/lib/python3.8/site-packages']
```

如果我们要添加自己的搜索目录：

```python
import sys
sys.path.append('/Users/michael/my_py_scripts')
```

遗留问题: 不同路径下有同名文件怎么办？

## 面向对象编程

面向对象最重要的概念就是类（Class）和实例（Instance），必须牢记类是抽象的模板，比如Student类，而实例是根据类创建出来的一个个具体的“对象”，每个对象都拥有相同的方法，但各自的数据可能不同。

```python
class Student(object):
    pass

bart = Student()
```

特殊的 `__init__` 方法，负责初始化。

```python
class Student(object):

    def __init__(self, name, score):
        self.name = name
        self.score = score

bart = Student('Bart Simpson', 59)
```

面向对象编程的一个重要特点就是数据封装。

```python
class Student(object):

    def __init__(self, name, score):
        self.name = name
        self.score = score

    def print_score(self):
        print('%s: %s' % (self.name, self.score))
```

在Class内部，可以有属性和方法，而外部代码可以通过直接调用实例变量的方法来操作数据，这样，就隐藏了内部的复杂逻辑。

变量名类似__xxx__的，也就是以双下划线开头，并且以双下划线结尾的，是特殊变量，特殊变量是可以直接访问的，不是private变量。

双下划线开头的实例变量是不是一定不能从外部访问呢？其实也不是。不能直接访问__name是因为Python解释器对外把__name变量改成了_Student__name，所以，仍然可以通过_Student__name来访问__name变量：

但是Python本身没有任何机制阻止你干坏事，一切全靠自觉。

```python
class Student(object):

    def __init__(self, name, score):
        self.__name = name
        self.__score = score

    def print_score(self):
        print('%s: %s' % (self.__name, self.__score))

a = Student('xiaoqiang', 60)

a.print_score()

# error
# print(a.__score)

# 不规范的使用
print(a._Student__score)
```

继承。

```python
class Animal(object):
    def run(self):
        print('Animal is running...')

class Dog(Animal):
    pass
```

多态。

```python
class Animal(object):
    def run(self):
        print('Animal is running...')

class Dog(Animal):
    def run(self):
        print('Dog is running...')
```

isinstance。

```python
c = Dog()

isinstance(c, Animal)
# True

b = Animal()
isinstance(b, Dog)
# False
```

当我们拿到一个对象的引用时，如何知道这个对象是什么类型、有哪些方法呢？使用type()

```python
type(123)
# <class 'int'>

type(123) == int
# True
```

能用type()判断的基本类型也可以用isinstance()判断。并且还可以判断一个变量是否是某些类型中的一种，比如下面的代码就可以判断是否是list或者tuple。

```python
isinstance([1, 2, 3], (list, tuple))
# True
```

如果要获得一个对象的所有属性和方法，可以使用dir()函数，它返回一个包含字符串的list，比如，获得一个str对象的所有属性和方法。

```python
dir('ABC')
# ['__add__', '__class__',..., '__subclasshook__', 'capitalize', 'casefold',..., 'zfill']
```

类似__xxx__的属性和方法在Python中都是有特殊用途的，比如__len__方法返回长度。在Python中，如果你调用len()函数试图获取一个对象的长度，实际上，在len()函数内部，它自动去调用该对象的__len__()方法，所以，下面的代码是等价的：

```python
len('ABC')
# 3
'ABC'.__len__()
# 3
```

hasattr()

```python
hasattr(obj, 'x') # 有属性'x'吗？
```

实例属性和类属。

实例属性属于各个实例所有，互不干扰；

类属性属于类所有，所有实例共享一个属性；

不要对实例属性和类属性使用相同的名字，否则将产生难以发现的错误。

```python
class Student(object):
    count = 0
```

## 面向对象高级编程

数据封装、继承和多态只是面向对象程序设计中最基础的3个概念。多重继承、定制类、元类等概念属于面向对象高级编程。

属性限制 __slots__。

```python
class Student(object):
    __slots__ = ('name', 'age') # 用tuple定义允许绑定的属性名称

s = Student() # 创建新的实例
s.name = 'Michael' # 绑定属性'name'
s.age = 25 # 绑定属性'age'
s.score = 99 # 绑定属性'score'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'Student' object has no attribute 'score'
```

@property 装饰器负责把一个方法变成属性调用。

```python
class Student(object):
    @property
    def score(self):
        return self._score

    @score.setter
    def score(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 100:
            raise ValueError('score must between 0 ~ 100!')
        self._score = value

s.score = 9999
# ValueError: score must between 0 ~ 100!
```

多重继承。

```python
class Animal(object):
    pass

# 大类:
# 哺乳动物
class Mammal(Animal):
    pass

# 鸟类
class Bird(Animal):
    pass

# 行为
class Runnable(object):
    def run(self):
        print('Running...')

class Flyable(object):
    def fly(self):
        print('Flying...')

# 多重继承
class Bat(Mammal, Flyable):
    pass
```

定制类。前面的 __init__ 、 __slots__ 、 __len__ 方法能帮我们定制类，还有其他的方法:

__str__，定义打印。

```python
class Student(object):
    def __init__(self, name):
    self.name = name
    def __str__(self):
        return 'Student object (name: %s)' % self.name

print(Student('Michael'))
```

__iter__，如果一个类想被用于for ... in循环，类似list或tuple那样，就必须实现一个__iter__()方法，该方法返回一个迭代对象，然后，Python的for循环就会不断调用该迭代对象的__next__()方法拿到循环的下一个值，直到遇到StopIteration错误时退出循环。

```python
class Fib(object):
    def __init__(self):
        self.a, self.b = 0, 1 # 初始化两个计数器a，b

    def __iter__(self):
        return self # 实例本身就是迭代对象，故返回自己

    def __next__(self):
        self.a, self.b = self.b, self.a + self.b # 计算下一个值
        if self.a > 100000: # 退出循环的条件
            raise StopIteration()
        return self.a # 返回下一个值

for n in Fib():
    print(n)
```

还有 __getitem__ 、 __getattr__ 和 __call__，先跳过，用到的时候再看。高级技巧其实约等于低频技巧。

枚举类。

```python
from enum import Enum
Month = Enum('Month', ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))

for name, member in Month.__members__.items():
    print(name, '=>', member, ',', member.value)

# Jan => Month.Jan , 1
# ...
```

value属性则是自动赋给成员的int常量，默认从1开始计数。如果需要更精确地控制枚举类型，可以从Enum派生出自定义类：

```python
from enum import Enum, unique

# @unique 装饰器可以帮助我们检查保证没有重复值
@unique
class Weekday(Enum):
    Sun = 0 # Sun的value被设定为0
    Mon = 1
    Tue = 2
    Wed = 3
    Thu = 4
    Fri = 5
    Sat = 6
```

访问这些枚举类型可以有若干种方法：

```python
day1 = Weekday.Mon
print(day1)
# Weekday.Mon

print(Weekday['Tue'])
# Weekday.Tue

print(Weekday.Tue.value)
# 2

print(day1 == Weekday.Mon)
# True

print(day1 == Weekday.Tue)
# False

print(Weekday(1))
# Weekday.Mon

print(day1 == Weekday(1))
# True

Weekday(7)
# Traceback (most recent call last):
#  ...
# ValueError: 7 is not a valid Weekday

for name, member in Weekday.__members__.items():
    print(name, '=>', member, member.value)

# Sun => Weekday.Sun 0
# ...
```

元类。据说用不到...

## 错误、调试和测试

catch 换成了 except。

```python
try:
    print('try...')
    r = 10 / 0
    print('result:', r)
except ZeroDivisionError as e:
    print('except:', e)
finally:
    print('finally...')
print('END')
```

如果不捕获错误，自然可以让Python解释器来打印出错误堆栈，但程序也被结束了。最佳实践是把错误堆栈打印出来，然后分析错误原因，同时，让程序继续执行下去。

```python
import logging

def foo(s):
    return 10 / int(s)

def bar(s):
    return foo(s) * 2

def main():
    try:
        bar('0')
    except Exception as e:
        logging.exception(e)

main()
print('END')
```

错误是class，捕获一个错误就是捕获到该class的一个实例。错误并不是凭空产生的，而是有意创建并抛出的。如果要抛出错误，首先根据需要，可以定义一个错误的class，选择好继承关系，然后，用raise语句抛出一个错误的实例。

```python
class FooError(ValueError):
    pass

def foo(s):
    n = int(s)
    if n==0:
        raise FooError('invalid value: %s' % s)
    return 10 / n

foo('0')
```

VS Code IDE 中断点调试很方便，不展开了。

为了编写单元测试，我们需要引入Python自带的unittest模块，编写mydict_test.py如下。

```python
import unittest

from mydict import Dict

class TestDict(unittest.TestCase):

    def test_init(self):
        d = Dict(a=1, b='test')
        self.assertEqual(d.a, 1)
        self.assertEqual(d.b, 'test')
        self.assertTrue(isinstance(d, dict))

    def test_key(self):
        d = Dict()
        d['key'] = 'value'
        self.assertEqual(d.key, 'value')

    def test_attr(self):
        d = Dict()
        d.key = 'value'
        self.assertTrue('key' in d)
        self.assertEqual(d['key'], 'value')

    def test_keyerror(self):
        d = Dict()
        with self.assertRaises(KeyError):
            value = d['empty']

    def test_attrerror(self):
        d = Dict()
        with self.assertRaises(AttributeError):
            value = d.empty
```

## IO编程

读文件。

```python
try:
    f = open('/path/to/file', 'r')
    print(f.read())
finally:
    if f:
        f.close()
```

简化写法。

```python
with open('/path/to/file', 'r') as f:
    print(f.read())
```

按行读取。

```python
for line in f.readlines():
    print(line.strip()) # 把末尾的'\n'删掉
```

读取二进制文件。

```python
f = open('./test.jpg', 'rb')
```

要读取非UTF-8编码的文本文件，需要给open()函数传入 encoding 参数。

```python
f = open('/Users/michael/gbk.txt', 'r', encoding='gbk')
```

操作文件和目录。

```python
import os
print(os.name)
```

变量从内存中变成可存储或传输的过程称之为序列化，反过来，把变量内容从序列化的对象重新读到内存里称之为反序列化。

```python
import pickle
# 序列化
d = dict(name='Bob', age=20, score=88)
pickle.dumps(d)
# b'\x80\x03}q\x00(X\x03\x00\x00\x00ageq\x01K\x14X\x05\x00\x00\x00scoreq\x02KXX\x04\x00\x00\x00nameq\x03X\x03\x00\x00\x00Bobq\x04u.'

# 反序列化
f = open('dump.txt', 'wb')
pickle.dump(d, f)
f.close()
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
