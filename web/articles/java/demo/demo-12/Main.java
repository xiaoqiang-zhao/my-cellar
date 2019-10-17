import java.util.Arrays;
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
