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

    GameClientHandler(Socket socket, Point location) {
        this.socket = socket;
        this.location = location;
    }

    public void sample_run() {
//        Sample output:
//        Accepting clients...
//        Reading:
//        GET / HTTP/1.1
//        Host: localhost:8000
//        Connection: keep-alive
//        Origin: null
//        User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36
//        Accept: */*
//        Accept-Encoding: gzip, deflate, br
//        Accept-Language: en-US,en;q=0.9,bg;q=0.8
//
//        Finished reading, sending response.

        System.out.println("Reading:");
        try {
            final Scanner s = new Scanner(socket.getInputStream());
            String line;
            do {
                line = s.nextLine();
                System.out.println(line);
            } while (!line.isEmpty());
            System.out.println(s.nextLine());

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

    @Override
    public void run() {
        try {
            System.out.println("Received client...");
//            sample_run();
            actualProcessing();
            System.out.println("Client processed.");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void actualProcessing() throws IOException {

        final String headers = "HTTP/1.x 200 OK\n" +
                "Access-Control-Allow-Origin: *\n" +
                "Content-Type: text/plain\n\n";

        Scanner s = new Scanner(socket.getInputStream());
        final String commandLine = s.nextLine();
        System.out.println("Received command: " + commandLine);
        final String[] command = commandLine.split(" ");
        final String spec = command[0];
        final String params = command[1];
        switch (spec) {

            case "GET":
                // send the headers
                OutputStream os = socket.getOutputStream();
                os.write(headers.getBytes());

                // send the content
                final String locationAsString = location.x + "/" + location.y;
                os.write(locationAsString.getBytes());

                // flush everything
                os.flush();
                break;

            case "POST":
                // read until empty line
                String line;
                do {
                    line = s.nextLine();
                    System.out.println(line);
                } while (!line.isEmpty());

                // next line contains our actual content
                line = s.nextLine();
                final String[] xys = line.split("/");
                location.x = Math.round(Float.parseFloat(xys[0]));
                location.y = Math.round(Float.parseFloat(xys[1]));
                System.out.println("Location set to " + location);

                // close the socket
                socket.getOutputStream().write(headers.getBytes());
                socket.getOutputStream().flush();
                break;

            default:
                // unknown http method - report bad request
                socket.getOutputStream().write(("HTTP/1.x 403 Bad Request\n" +
                        "Access-Control-Allow-Origin: *\n" +
                        "Content-Type: text/plain\n\n").getBytes());
                socket.getOutputStream().flush();
        }
    }
}