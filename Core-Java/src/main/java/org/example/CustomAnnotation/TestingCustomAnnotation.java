package org.example.CustomAnnotation;

import java.lang.reflect.Method;

@UtkarshAnnotation(value="TestingAnnotation", count=1)
public class TestingCustomAnnotation {

    @UtkarshAnnotation(value="testMethod", count=2)
    public void method(){
        System.out.println("This is a method with custom annotation.");
    }

    private static void example() throws NoSuchMethodException {
        Class<TestingCustomAnnotation> TestingCustomAnnotation = TestingCustomAnnotation.class;
        UtkarshAnnotation annotation = TestingCustomAnnotation.getAnnotation(UtkarshAnnotation.class);

        String value = annotation.value();
        int count = annotation.count();
        System.out.println("value: " + value + ", count: " + count);

        Method method = TestingCustomAnnotation.getMethod("method");
        UtkarshAnnotation annotation1 = method.getAnnotation(UtkarshAnnotation.class);

        System.out.println("value: " + annotation1.value());
        System.out.println("count: " + annotation1.count());
    }

    public static void main(String[] args) throws NoSuchMethodException {
        example();
    }

}
