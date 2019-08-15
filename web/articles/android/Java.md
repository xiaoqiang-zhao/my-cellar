# Java 自学

## JDK 理论知识(Day1)

JDK是 Java 语言的软件开发工具包，主要用于移动设备、嵌入式设备上的java应用程序。JDK是整个java开发的核心，它包含了JAVA的运行环境（JVM+Java系统类库）和JAVA工具。

-- 来自百度百科

Java 语言的软件开发工具包有不同的版本，用于开发不同类型的应用:

|    Version    |     Name     | Publish Date |
|     ----      |     ----     |     ---      |
|   JDK 1.1.4   |    Sparkler  |  1997-09-12  |
|   J2SE 1.2    |   Playground |  1998-12-04  |   
|   Java SE 5.0 |      Tiger   |  2004-09-30  |
|   Java SE 10	|              |  2018-03-14  |

- JDK(Java Development Kit) 是较为原始的一个版本，现在基本不用了
- J2SE(standard edition) 标准版，是我们通常用的一个版本，从JDK 5.0开始，改名为Java SE
- Java EE(enterprise edition) 企业版，使用这种JDK开发J2EE应用程序

另外还有一个做手机应用的版本 Java ME。

在一台电脑上可以同时安装Java SE、Java EE、Java ME，不影响，对应开发需求不一样，用对应的版本。

## 自己的理解与行动

JDK 有了广义和狭义两种说法，广义上指所有版本的 Java 语言的软件开发工具包，狭义上指 1.2 之前的版本。

分别安装 SE、EE 、ME 对比学习。

## Mac 上安装运行 Java

Java 属于 oracle 公司，从其官网进入到 Java SDK 的下载列表，里面有个版本的下载地址
https://www.oracle.com/technetwork/java/javase/downloads/index.html

### 下载安装最新的 SE12
 
地址: https://download.oracle.com/otn-pub/java/jdk/12.0.2+10/e482c34c86bd4bf8b56c0b35558996b9/jdk-12.0.2_osx-x64_bin.dmg

只有 173M。

直接下一步下一步就完成了，省去了手动安装配置环境变量等步骤。

```shel
# 运行下面命令验证是否安装成功
java --version
# 安装成功后输出如下内容
java 12.0.2 2019-07-16
Java(TM) SE Runtime Environment (build 12.0.2+10)
Java HotSpot(TM) 64-Bit Server VM (build 12.0.2+10, mixed mode, sharing)
```

### 安装IDE

能写 Java 的 IDE 很多，有老牌的 NetBeans 和 Eclipse，也有比较新的 IntelliJ IDEA 和专门开发安卓 App 的 Android Studio。组里做 Java 开发的貌似用 IntelliJ IDEA 的比较多，这里从个众。

The top 11 Free IDE for Java Coding:
https://blog.idrsolutions.com/2015/03/the-top-11-free-ide-for-java-coding-development-programming/

IntelliJ IDEA 有官方免费试用版 和 社区免费版，当然如果你不差钱直接花 499$ 买个官方正式版。这里选择了社区版，想着入门应该够用了。

https://www.jetbrains.com/idea/features/
