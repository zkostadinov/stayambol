import java.net.Socket;

class Client {
    public static void main(String[] args) throws Exception {
        System.out.println("Connecting to server...");
        Socket connection = new Socket("localhost", 8000);
        System.out.println("Connected.");
        System.out.println("Requesting index page content.");
        connection.getOutputStream().write("GET /\n\n".getBytes());
//        byte[] response = connection.getInputStream().readAllBytes();
        byte[] response = new byte[10];
        while(true) {
            int countRead = connection.getInputStream().read(response);
            System.out.println(countRead);
            if (countRead == -1) {
                break;
            }
            System.out.println(new String(response, 0, countRead));
        }
    }
}