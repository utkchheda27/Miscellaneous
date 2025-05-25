package org.example;

//Here extending the Thread Class into C..inheriting Thread as Parent Class
class C extends Thread{
    //overide run method
    public void run() {
        int i=0;
        for(;i<9;i++){
            System.out.println("Thread C: "+i);
        }
    }
}
class D extends Thread{
    public void run() {
        int i=0;
        for(;i<9;i++){
            System.out.println("Thread D: "+i);
        }
    }
}

public class Threads_Using_ThreadClass {
    public static void main(String[] args){
        //No need to create object of thread
        //C,D are already inheriting from thread
        C obj =new C();
        D obj2 =new D();
        //since inheriting from thread, also have access to start() method of thread
        obj.start();
        obj2.start();
    }
}
