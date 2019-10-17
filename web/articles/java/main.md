# Java EE 学习

> 夯实基础，一切代码以 Java 13 为运行环境。

## Java 快速入门

### 简介

Java最早是由SUN公司（已被Oracle收购）的詹姆斯·高斯林（高司令，人称Java之父）在上个世纪90年代初开发的一种编程语言。

在1995年以Java的名称正式发布。

随着Java的发展，SUN给Java又分出了三个不同版本：

- Java SE：Standard Edition
- Java EE：Enterprise Edition
- Java ME：Micro Edition

简单来说，Java SE就是标准版，包含标准的JVM和标准库。而Java EE是企业版，它只是在Java SE的基础上加上了大量的API和库，以便方便开发Web应用、数据库、消息服务等，Java EE的应用使用的虚拟机和Java SE完全相同。Java ME就和Java SE不同，它是一个针对嵌入式设备的“瘦身版”。

因此我们推荐的Java学习路线图如下：

- 1. 首先要学习Java SE，掌握Java语言本身、Java核心开发技术以及Java标准库的使用；
- 2. 如果继续学习Java EE，那么Spring框架、数据库开发、分布式架构就是需要学习的；
- 3. 如果要学习大数据开发，那么Hadoop、Spark、Flink这些大数据平台就是需要学习的，他们都基于Java或Scala开发；
- 4. 如果想要学习移动开发，那么就深入Android平台，掌握Android App开发。

无论怎么选择，Java SE的核心技术是基础，这个教程的目的就是让你完全精通Java SE！

初学者学Java，经常听到JDK、JRE这些名词，它们到底是啥？

- JDK：Java Development Kit
- JRE：Java Runtime Environment

简单地说，JRE就是运行Java字节码的虚拟机。但是，如果只有Java源码，要编译成Java字节码，就需要JDK，因为JDK除了包含JRE，还提供了编译器、调试器等开发工具。

二者关系如下：

```
  ┌─    ┌──────────────────────────────────┐
  │     │     Compiler, debugger, etc.     │
  │     └──────────────────────────────────┘
 JDK ┌─ ┌──────────────────────────────────┐
  │  │  │                                  │
  │ JRE │      JVM + Runtime Library       │
  │  │  │                                  │
  └─ └─ └──────────────────────────────────┘
        ┌───────┐┌───────┐┌───────┐┌───────┐
        │Windows││ Linux ││ macOS ││others │
        └───────┘└───────┘└───────┘└───────┘
```

### JDK 和 IDE 安装

从其官网进入到 Java SDK 的下载列表，里面各个版本的下载地址
https://www.oracle.com/technetwork/java/javase/downloads/index.html

直接下一步下一步就完成了，省去了手动安装配置环境变量等步骤，大体原理就是将 Java 相关的可执行文件拷贝到 /usr/local 下，环境变量由 /etc/paths 统一指定。

```shel
# 运行下面命令验证是否安装成功
java --version
# 安装成功后输出如下内容
java 13-ea 2019-09-17
Java(TM) SE Runtime Environment (build 13-ea+33)
Java HotSpot(TM) 64-Bit Server VM (build 13-ea+33, mixed mode, sharing)
```

IDE 选择了 IntelliJ IDEA 社区免费版。

### 第一个 Java 程序

新建 Hello.java 文件，写入内容:

```java
// demo-01
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```

然后编译 `javac Hello.java`，如果没有错误那就会在相同路径下产出一个 Hello.class 文件，执行 `java Hello` 就输出了 `Hello, world!`。

补充: 一个 Java 源码只能定义一个 public 类型的 class，并且 class 名称和文件名要完全一致；

### Java 程序基础

Java 是面向对象的语言，一个程序的基本单位就是 class。类名要求：

- 类名必须以英文字母开头，后接字母，数字和下划线的组合；
- 习惯以大写字母开头。

要注意遵守命名习惯，好的类命名：Hello、NoteBook、VRPlayer。不好的类命名：hello、Good123、Note_Book、_World。

在 Java 中，变量分为两种：基本类型的变量和引用类型的变量。

```java
public class Main {
    public static void main(String[] args) {
        int n = 100;
        int x = n;

        x = x + 100;
        System.out.println("x = " + x); // 200
        System.out.println("n = " + n); // 100
   }
}
```

#### 基本类型数据

声明变量后就确定变量占内存长度的是基本类型，基本数据类型是 CPU 可以直接进行运算的类型。Java 定义了以下几种基本数据类型：

- 整数类型：byte，short，int，long
- 浮点数类型：float，double
- 字符类型：char
- 布尔类型：boolean

一个字节就是一个 8 位二进制数，换算成 10 进制就是 2 的 8 次方(=16*16=256)，中间有 0，byte 型整数的范围就是 -128 ~ 127。

- byte: -2^4 ~ (2^4 - 1)
- short: -2^15 ~ (2^15 - 1), 也就是 2byte
- int: -2^31 ~ (2^31 - 1), 也就是 4byte
- long: -2^63 ~ (2^63 - 1), 也就是 8byte

```java
int i = 2147483647;
int i2 = -2147483648;
int i3 = 2_000_000_000; // 加下划线更容易识别
int i4 = 0xff0000; // 十六进制表示的16711680
int i5 = 0b1000000000; // 二进制表示的512
long l = 9000000000000000000L; // long型的结尾需要加L
```

浮点类型的数就是小数，因为小数用科学计数法表示的时候，小数点是可以“浮动”的，如 1234.5 可以表示成 12.345x102，也可以表示成 1.2345x103，所以称为浮点数。浮点数可表示的范围非常大，float 类型可最大表示 3.4x10^38，而 double 类型可最大表示1.79x10^308。

```java
float f1 = 3.14f;
float f2 = 3.14e38f; // 科学计数法表示的3.14x10^38
double d = 1.79e308;
double d2 = -1.79e308;
double d3 = 4.9e-324; // 科学计数法表示的4.9x10^-324
```

整型和浮点数的运算和 js 基本相同，在运算过程中如果参与运算的两个数类型不一致，那么计算结果为较大类型的整型。也可以将结果强制转型，即将大范围的整数转型为小范围的整数。强制转型使用(类型)。

```java
short s = 1234;
int i = 123456;
int x = s + i; // s 自动转型为 int 产于运算，s 本身不改变

s = (short) i; // 12345
```

由于浮点数存在运算误差，所以比较两个浮点数是否相等常常会出现错误的结果。正确的比较方法是判断两个浮点数之差的绝对值是否小于一个很小的数：

```java
// 比较x和y是否相等，先计算其差的绝对值:
double r = Math.abs(x - y);
// 再判断绝对值是否足够小:
if (r < 0.00001) {
    // 可以认为相等
} else {
    // 不相等
}
```

布尔类型 boolean 只有 true 和 false 两个值，布尔类型总是关系运算的计算结果：

```java
boolean b1 = true;
boolean b2 = false;
boolean isGreater = 5 > 3; // 计算结果为true
int age = 12;
boolean isAdult = age >= 18; // 计算结果为false
```

字符类型 char 表示一个字符。Java 的 char 类型除了可表示标准的 ASCII 外，还可以表示一个 Unicode 字符：

```java
char a = 'A';
char zh = '中';
```

定义变量的时候，如果加上 final 修饰符，这个变量就变成了常量：

```java
final double PI = 3.14; // PI是一个常量
double r = 5.0;
double area = PI * r * r;
PI = 300; // 编译错误
```

var关键字，有些时候，类型的名字太长，写起来比较麻烦。例如：

```java
StringBuilder sb = new StringBuilder();
```

这个时候，如果想省略变量类型，可以使用var关键字：

```java
var sb = new StringBuilder();
```

编译器会根据赋值语句自动推断出变量 sb 的类型是 StringBuilder。对编译器来说，语句：

```java
var sb = new StringBuilder();
```

实际上会自动变成：

```java
StringBuilder sb = new StringBuilder();
```

因此，使用var定义变量，仅仅是少写了变量类型而已。

#### 引用类型数据

引用类型是指声明后不确定占用多少内容的变量，存储的是内存地址，真正的值在所指内存储开始存储(如果不指向任何地址可以使用 null 做为默认值)，比如字符串和数组。字符串类型 String:

```java
String s1 = "中文 ABC";
s1 = "123456789";
String s2 = "abc\"xyz";
```

java 中的字符串值必须用双引号包裹，转移字符用斜杠，用加好连接可以拼接字符串，也可以转变部分类型数据:

```java
String s1 = "Hello";
String s2 = "world";
String s3 = s1 + " " + s2 + "!";

int age = 25;
String s4 = "age is " + age;
```

从Java 13开始，字符串可以用"""..."""表示多行字符串（Text Blocks）了。

```java
// demo-04
String s = """
            SELECT * FROM
                users
            WHERE id > 100
            ORDER BY name DESC
            """;
```

上述多行字符串实际上是 5 行，在最后一个 "DESC" 后面还有一个 `\n`。还需要注意到，多行字符串前面共同的空格会被去掉，这一点 js 要学学了。

数组变量，是引用类型，java 不同于 js 的地方:

- 要求全部元素是同一种数据类型；
- 数组一旦创建后，大小就不可改变；
- 数组所有元素初始化为默认值，整型都是0，浮点型是0.0，布尔型是false。

```java
// demo-05
int[] ns = new int[5];
System.out.println(ns.length); // 5
```

### 流程控制

语句的基本语法是:

```java
if (条件) {
    // 条件满足时执行
}
// 例如 demo-06:
int n = 70;
if (n >= 60) {
    System.out.println("及格了");
} else {
    System.out.println("未及格");
}
```

注意判断浮点数相等的方法是两个数的差值绝对值小于一个较小的数字: `Math.abs(a - b) < 0.00001`。对于引用类型相等的意思是指向同一个对象，而不是内容相同。要判断引用类型的变量内容是否相等，必须使用 equals() 方法:

```java
// demo-06
String s1 = "hello";
String s2 = "HELLO".toLowerCase();
System.out.println(s1);
System.out.println(s2);
if (s1.equals(s2)) {
    System.out.println("s1 equals s2");
} else {
    System.out.println("s1 not equals s2");
}
```

注意: 执行语句 s1.equals(s2) 时，如果变量 s1 为 null，会报 NullPointerException。要避免 NullPointerException 错误，可以利用与算符 &&: `if (s1 != null && s1.equals(s2))`。

switch，字符串匹配时，是比较“内容相等”，还可以使用枚举类型，枚举类型我们在后面讲解。
```java
int option = 99;
switch (option) {
case 1:
    System.out.println("Selected 1");
    break;
case 2:
    System.out.println("Selected 2");
    break;
case 3:
    System.out.println("Selected 3");
    break;
default:
    System.out.println("Not selected");
    break;
}

String fruit = "apple";
switch (fruit) {
case "apple":
    System.out.println("Selected apple");
    break;
case "pear":
    System.out.println("Selected pear");
    break;
case "mango":
    System.out.println("Selected mango");
    break;
default:
    System.out.println("No fruit selected");
    break;
}
```

while 循环，基本用法是:
```java
while (条件表达式) {
    循环语句
}
// 继续执行后续代码

// demo-08
int sum = 0; // 累加的和，初始化为0
int n = 1;
while (n <= 100) { // 循环条件是n <= 100
    sum = sum + n; // 把n累加到sum中
    n ++; // n自身加1
}
System.out.println(sum); // 5050
```

do while循环会至少循环一次。

```java
int sum = 0;
int n = 1;
do {
    sum = sum + n;
    n ++;
} while (n <= 100);
System.out.println(sum);
```

for 循环
```java
public static void main(String[] args) {
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum = sum + i;
    }
    System.out.println(sum);

    // 遍历数组
    int[] ns = { 1, 4, 9, 16, 25 };
    for (int i=0; i<ns.length; i++) {
        System.out.println(ns[i]);
    }
}
```

无论是 while 循环还是 for 循环，有两个特别的语句可以使用，就是 break 语句和 continue 语句。break 在循环过程中跳出当前循环，continue 则是提前结束本次循环:

```java
// demo-09
int sum = 0;
for (int i = 1; i < 5; i++) {
    sum = sum + i;
    if (i == 2) {
        break;
    }
    System.out.println(i);
}
System.out.println(sum); // 3 = 1 + 2

sum = 0;
for (int i = 1; i < 5; i++) {
    sum = sum + i;
    if (i == 2) {
        continue;
    }
    System.out.println(i);
}
System.out.println(sum); // 10 = 1 + 2 + 3 + 4
```

### 数组操作

遍历数组除了用 for 遍历数组，还可以使用 for each

```java
// demo-10
import java.util.Arrays;

int[] ns = { 1, 4, 9, 16, 25 };
for (int n : ns) {
    System.out.println(n);
}

// 快速打印数组
System.out.println(Arrays.toString(ns));
```

多维数组:

```java
int[][] ns = {
    { 1, 2, 3, 4 },
    { 5, 6, 7, 8 },
    { 9, 10, 11, 12 }
};
```

## 面向对象编程

> 把现实世界映射到计算机模型的一种编程方法。

### 面向对象基础

#### publish, private, this

带有 publish 的方法和属性才能被外界直接调用。用 shis 在类中调用类的属性和方法。

```java
// demo-11
public class Main {
    public static void main(String[] args) {
        Persion xiaoqiang = new Persion();
        xiaoqiang.setName("xiaoqiang");
        xiaoqiang.age = 18;
    }
}

class Persion() {
    private String name;
    public Int age;

    public void setName(String name) {
        this.name = name;
    }

    publish String getName() {
        return this.name;
    }
}
```

注意传递参数时基本数据类型和引用数据类型的区别。

#### 构造方案

构造方法可以批量初始化重要字段。

```java
// demo-12
public class Main {
    public static void main(String[] args) {
        Persion xiaoqiang = new Persion("xiaoqiang", 18);

        System.out.println(xiaoqiang.getName()); // xiaoqiang
        System.out.println(xiaoqiang.age);       // 18
    }
}

class Persion {
    private String name;
    public int age;

    public Persion(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return this.name;
    }
}
```

构造方法是可选的，并不是每个类都有构造方法，更具参数的不同构造方法还可以有多个。

```java
class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Person(String name) {
        this.name = name;
        this.age = 12;
    }

    public Person() {
    }
}
```

#### 继承

单继承，Java 只允许一个 class 继承自另一个类，一个类有且仅有一个父类。只有 Object 特殊，它没有父类，是所有类继承的源头。

子类无法访问父类的 private 字段或者 private 方法。把 private 改为 protected，字段和方法就可以被子类访问了

super 关键字表示父类（超类）。子类引用父类的字段时，可以用 super.fieldName。

如果父类构造方法有参数，那么需要显示的调用，否则默认调用无参构造方法。

```java
class Person {
    protected String name;
    protected int age;

    public String getName() {...}
    public void setName(String name) {...}
    public int getAge() {...}
    public void setAge(int age) {...}
}

class Student extends Person {
    // 不要重复name和age字段/方法,
    // 只需要定义新增score字段/方法:
    private int score;

    public int getScore() {
        return this.score;
    }
    public void setScore(int score) {
        this.score = score;
    }
}
```



```java

```

区分继承和组合，继承是is关系，组合是has关系。

### Java 核心模块


