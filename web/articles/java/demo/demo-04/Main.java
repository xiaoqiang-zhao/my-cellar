public class Main {
    public static void main(String[] args) {
        String s = """
            SELECT * FROM
                users
            WHERE id > 100
            ORDER BY name DESC
            """;
        System.out.println("s =" + s);
    }
}