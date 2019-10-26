import java.lang.reflect.Method;

public class Main {
    public static void main(String[] args) throws Exception {
        Person p = new Person("xiaoqiang", "zhao");
        String fullName = getFullName(p);
        System.out.println(fullName);
    }

    public static String getFullName(Object obj) {
        // 怎么知道下面两个方法能不能用？ 
        // 实际上肯定不能直接用的, 要用反射的方法来输出
        // return obj.getFirstName() + " " + obj.getLastName();

        // 反射的方式
        String result = "-";
        Class cls = obj.getClass();
        try {
            Method getFirstNameMethod = cls.getMethod("getFirstName");
            Method getLastNameMethod = cls.getMethod("getLastName");
            String firstName = (String) getFirstNameMethod.invoke(obj);
            String lastName = (String) getLastNameMethod.invoke(obj);
            result = firstName + "-" + lastName;
        } catch(Exception e) {
            System.out.println("未找到方法 getFirstName 或 getLastName");
        }

        return result;
    }
}

class Person {
    private String firstName;
    private String lastName;

    public Person(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }
}
