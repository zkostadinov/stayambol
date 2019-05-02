import java.io.IOException;
import java.net.Socket;

public class GadenClient {
    public static void main(String[] args) throws IOException, InterruptedException {
        Socket s = new Socket("localhost", 8080);
        System.out.println("Connected to server. Blocking it.");
        Thread.sleep(10000000);
    }
}
