public class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i < 5; i++) {
            sum = sum + i;
            if (i == 2) {
                break;
            }
            System.out.println(i);
        }
        System.out.println(sum); // 3 = 1 + 2

        sum = 0;
        for (int i = 1; i < 5; i++) {
            sum = sum + i;
            if (i == 2) {
                continue;
            }
            System.out.println(i);
        }
        System.out.println(sum); // 10 = 1 + 2 + 3 + 4
    }
}
