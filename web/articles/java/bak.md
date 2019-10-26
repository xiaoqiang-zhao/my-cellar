
### Java 程序基础

所有变量必须先定义后使用，在定义变量的时候，可以给它一个初始值。不写初始值使用时编译阶段会报“尚未初始化变量”错误。

```java
// demo-2
public class Main {
    public static void main(String[] args) {
        int x = 100; // 定义int类型变量x，并赋予初始值100
        System.out.println(x); // 打印该变量的值
        // int y;
        // System.out.println(y); // 报错“尚未初始化变量”
    }
}
```

## Java 常用的包

1. java.awt：提供了绘图和图像类，主要用于编写GUI程序，包括按钮、标签等常用组件以及相应的事件类。

2. java.lang：java的语言包，是核心包，默认导入到用户程序，包中有object类，数据类型包装类，数学类，字符串类，系统和运行时类，操作类，线程类，错误和异常处理类，过程类。`java.lang.String` 和 `java.lang.reflect.Method`。

3. java.io：包含提供多种输出输入功能的类。

4. java.net： 包含执行与网络有关的类，如URL，SCOKET，SEVERSOCKET等。

5. java.applet：包含java小应用程序的类。

6. java.util：包含集合框架、遗留的 collection 类、事件模型、日期和时间设施、国际化和各种实用工具类（字符串标记生成器、随机数生成器和位数组、日期Date类、堆栈Stack类、向量Vector类等）。集合类、时间处理模式、日期时间工具等各类常用工具包。`java.util.Arrays`。

7. java.sql：提供使用 JavaTM 编程语言访问并处理存储在数据源（通常是一个关系数据库）中的数据的 API。
