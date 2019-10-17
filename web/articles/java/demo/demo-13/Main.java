import java.util.Arrays;
public class Main {
    public static void main(String[] args) {
        Student xiaoqiang = new Student("xiaoqiang", 18, 0);
    }
}

class Person {
    protected String name;
    protected int age;
    
    public Person() {
        
    }

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getAge() {
        return this.age;
    }
    public void setAge(int age) {
        this.age = age;
    }
}

class Student extends Person {
    // 不要重复name和age字段/方法,
    // 只需要定义新增score字段/方法:
    private int score;

    public Student(String name, int age, int score) {
        // 如果父类构造方法有参数，那么需要显示的调用，否则默认调用无参构造方法
        super(name, age);
        super.age = age + 1;
        this.score = score;
    }

    public int getScore() {
        return this.score;
    }
    public void setScore(int score) {
        this.score = score;
    }
}
