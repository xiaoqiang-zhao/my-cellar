// 指定同一作用域
// package xiaoqiang;

// 或者手动引入其他两个类
import xiaoqiang.Person;
import xiaoqiang.Sportsman;

package zhao;

public class Main {
    public static void main(String[] args) {
        Person p = new Sportsman();
        p.run(); // 调用哪个方法呢?
    }
}
