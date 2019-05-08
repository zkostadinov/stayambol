import java.net.Socket;
import java.io.*;
import java.util.Scanner;

class Client {
    public static void main(String[] args) {
        System.out.println("Connecting to server...");
        try {
            Socket connection = new Socket("localhost", 8080);
            System.out.println("Connected.");
            System.out.println("Requesting index page content.");
            byte[] response = new byte[100000];
            int countRead = connection.getInputStream().read(response);
            System.out.println("Server said: " + new String(response, 0, countRead));

            System.out.print("Please enter your name:");
            String name;
            name = new Scanner(System.in).nextLine();

            connection.getOutputStream().write(name.getBytes());
            connection.getOutputStream().flush();
            System.out.println("Sent the name to the server. Exiting.");
        } catch (IOException e) {
            System.out.println("There was exception " + e);
            e.printStackTrace();
        }
    }
}