public class Main {
    public static void main(String[] args) {
        Sportsman liuxiang = new Sportsman();
        liuxiang.run();

        Person p = new Sportsman();
        p.run(); // 调用哪个方法呢?
    }
}

class Person {
    public void run() {
        System.out.println("Person.run");
    }
}

class Sportsman extends Person {
    @Override
    public void run() {
        System.out.println("Sportsman.run");
    }
}
