import java.io.IOException;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {

    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(8000);
        Socket accept = serverSocket.accept();
        OutputStream os = accept.getOutputStream();
        os.write("hello and bye!".getBytes());
        os.flush();
        os.close();
        accept.close();
    }

}
