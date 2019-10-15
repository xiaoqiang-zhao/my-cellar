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

### JDK 和 IDE 安装

从其官网进入到 Java SDK 的下载列表，里面各个版本的下载地址
https://www.oracle.com/technetwork/java/javase/downloads/index.html

直接下一步下一步就完成了，省去了手动安装配置环境变量等步骤，大体原理就是将 java 相关的可执行文件拷贝到 /usr/local 下，环境变量由 /etc/paths 统一指定。

```shel
# 运行下面命令验证是否安装成功
java --version
# 安装成功后输出如下内容
java 13-ea 2019-09-17
Java(TM) SE Runtime Environment (build 13-ea+33)
Java HotSpot(TM) 64-Bit Server VM (build 13-ea+33, mixed mode, sharing)
```

IDE 选择了 IntelliJ IDEA 社区免费版。

### 第一个 java 程序

新建 Hello.java 文件，写入内容:

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```

然后编译 `javac Hello.java`，如果没有错误那就会在相同路径下产出一个 Hello.class 文件，执行 `java Hello` 就输出了 `Hello, world!`
