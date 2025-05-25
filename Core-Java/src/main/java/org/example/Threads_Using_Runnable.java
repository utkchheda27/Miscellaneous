package org.example;

//implementing Runnable interface
class A implements Runnable{
    // overiding run method of Runnable
    public void run() {
        int i=0;
        for(;i<9;i++){
            System.out.println("Thread A: "+i);
        }
    }
}

class B implements Runnable{
    public void run() {
        int i=0;
        for(;i<9;i++){
            System.out.println("Thread B: "+i);
        }
    }
}

public class Threads_Using_Runnable {
    public static void main(String[] args){
        //Can't directly pass object of class A to thread
        //need to implement the Runnable interface and overide run()
        //To execute the thread, need to call the start() method of thread
        Thread t1=new Thread(new A());
        Thread t2=new Thread(new B());
        t1.start();
        t2.start();
        //The output won't be in order.
    }
}
