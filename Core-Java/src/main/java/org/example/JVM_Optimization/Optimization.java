package org.example.JVM_Optimization;

public class Optimization {

    // A simple method the JVM can optimize
    public static int addNumbers(Integer k) {
        if (k == null) {
            return 42;
        } else {
            return k + 2;
        }
    }

    public static void main(String[] args) throws Exception {

        // Run the method MANY times to make it "hot"
        for (int i = 0; i < 50_000_000; i++) {

            if (i % 5 == 0) {
                addNumbers(null);   // uncommon path
            } else {
                addNumbers(i);      // common path
            }
        }

        // Keep JVM alive so logs flush
        Thread.sleep(2000);
    }
}
