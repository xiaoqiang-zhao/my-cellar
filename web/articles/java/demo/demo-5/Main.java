public class Main {
    public static void main(String[] args) {
        int[] ns = new int[5];
        System.out.println(ns.length); // 5
        System.out.println(ns[3]); // 0

        int[] ns2 = new int[] { 68, 79, 91, 85, 62 }; // 还可以进一步简写为：int[] ns = { 68, 79, 91, 85, 62 };
        System.out.println(ns2.length); // 编译器自动推算数组大小为 5
   }
}
