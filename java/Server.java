import java.net.Socket;
import java.net.ServerSocket;
import java.io.*;

class Server {
    public static void main(String[] args) throws Exception {
        System.out.println("Connecting to server...");
        ServerSocket server = new ServerSocket(8080);

        while(true) {
            System.out.println("Listening to client...");
            final Socket s = server.accept();

            Thread t = new Thread(){
                public void run() {
                    try {
                        System.out.println("Client accepted, sending greeting.");
                        s.getOutputStream().write("Who are you\n".getBytes());
                        s.getOutputStream().flush();

                        byte[] response = new byte[1000];
                        int number = s.getInputStream().read(response);
                        String name = new String(response, 0, number);

                        System.out.println("Sleeping a second...");
                        Thread.sleep(1000);
                        System.out.println("Second ended.");

                        s.getOutputStream().write(("Hello " + name + "\n").getBytes());
                        s.getOutputStream().flush();

                        s.close();
                        System.out.println("Clever client " + name);
                    } catch (IOException e) {
                        System.out.println("Stupid client!");
                        e.printStackTrace();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            };
            t.start();

        }
    }
}