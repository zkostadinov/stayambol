import java.net.Socket;

class Client {
    public static void main(String[] args) throws Exception {
        System.out.println("Connecting to server...");
        Socket socket = new Socket("localhost", 8000);
        System.out.println("Connected.");
        System.out.println("Requesting index page content.");
        socket.getOutputStream().write("GET /\n\n".getBytes());
        byte[] response = socket.getInputStream().readAllBytes();
        System.out.println(new String(response));
    }
}