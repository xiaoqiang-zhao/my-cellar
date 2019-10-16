public class Main {
    public static void main(String[] args) {
        int n = 70;
        if (n >= 60) {
            System.out.println("及格了");
        }
        else {
            System.out.println("未及格");
        }

        // 字符串相等判断
        String s1 = "hello";
        String s2 = "HELLO".toLowerCase();
        System.out.println(s1);
        System.out.println(s2);
        if (s1.equals(s2)) {
            System.out.println("s1 equals s2");
        } else {
            System.out.println("s1 not equals s2");
        }

        // 数组相等探索: 不适合用 equals
        int[] intArr1 = {1, 2, 3};
        int[] intArr2 = {1, 2, 3};
        if (intArr1.equals(intArr2)) {
            System.out.println("intArr1 equals intArr2");
        } else {
            System.out.println("intArr1 not equals intArr2");
        }
    }
}
