import java.util.Arrays;
public class Main {
    public static void main(String[] args) {
        Persion xiaoqiang = new Persion();
        xiaoqiang.setName("xiaoqiang");
        xiaoqiang.age = 18;

        System.out.println(xiaoqiang.getName()); // xiaoqiang
        System.out.println(xiaoqiang.age);       // 18
    }
}

class Persion {
    private String name;
    public int age;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
