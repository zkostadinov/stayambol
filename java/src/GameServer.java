import java.awt.*;
import java.io.IOException;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

public class GameServer {
    public static void main(String[] args) throws IOException {
        final Point location = new Point();
        System.out.println("Accepting clients...");
        ServerSocket ss = new ServerSocket(8000);
        //noinspection InfiniteLoopStatement
        while (true) {
            Socket socket = ss.accept();
            GameClientHandler client = new GameClientHandler(socket, location);
            client.start();
        }
    }
}

class GameClientHandler extends Thread {
    private final Socket socket;
    private final Point location;

    public GameClientHandler(Socket socket, Point location) {
        this.socket = socket;
        this.location = location;
    }

    @Override
    public void run() {
        System.out.println("Reading:");
        try {
            final Scanner s = new Scanner(socket.getInputStream());
            String line;
            do {
                line = s.nextLine();
                System.out.println(line);
            } while (!line.isEmpty());
            System.out.println("Finished reading, sending response.");
            OutputStream os = socket.getOutputStream();
            os.write(("HTTP/1.x 200 OK\n" +
                    "Access-Control-Allow-Origin: *\n" +
                    "Content-Type: text/json\n\n").getBytes());
            os.write("{\"x\": 4}\n".getBytes());
            os.flush();
            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void mun() throws IOException {
        final String commandLine = new Scanner(socket.getInputStream()).nextLine();
        final String[] command = commandLine.split(" ");
        final String spec = command[0];
        final String params = command[1];
        switch (spec) {
            case "GET":
                final String locationAsString = location.x + "/" + location.y;
                OutputStream os = socket.getOutputStream();
                os.write(locationAsString.getBytes());
                os.flush();
                break;
            case "PUT":
                final String locationFromString = new Scanner(socket.getInputStream()).nextLine();
                final String[] xys = locationFromString.split("/");
                location.x = Integer.parseInt(xys[0]);
                location.y = Integer.parseInt(xys[1]);
        }
    }
}