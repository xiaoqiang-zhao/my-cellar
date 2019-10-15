
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
