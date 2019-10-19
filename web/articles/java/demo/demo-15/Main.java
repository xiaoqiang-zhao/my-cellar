public class Main {
    public static void main(String[] args) {
        Person p = new Sportsman("xiaoqiang");
        p.run();
    }
}

interface Person {
    String getName();
    default void run() {
        System.out.println(getName() + " run");
    }
}

class Sportsman implements Person {
    private String name;

    public Sportsman(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}