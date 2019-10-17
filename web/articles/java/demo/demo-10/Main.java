import java.util.Arrays;
public class Main {
    public static void main(String[] args) {
        // demo-10
        int[] ns = { 1, 4, 9, 16, 25 };
        for (int n : ns) {
            System.out.println(n);
        }

        // 快速打印数组
        System.out.println(Arrays.toString(ns));
    }
}
