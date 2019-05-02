public class ThreadDemo {
    public static void main(String[] args) {

        Thread t1 = new Thread(){
            public void run() {
                for (int i = 0; i < 100; i ++) {
                    System.out.println("Thread1: " + i);
                }
            }
        };
        Thread t2 = new Thread(){
            public void run() {
                for (int i = 0; i < 100; i ++) {
                    System.out.println("Thread2: " + i);
                }
            }
        };

        t1.start();
        t2.start();

    }
}
