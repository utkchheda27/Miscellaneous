package org.example.CustomAnnotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)//when annotation will be available
@Target({ ElementType.TYPE, ElementType.METHOD })//where we can apply this annotation
public @interface UtkarshAnnotation {
    String value()default "Utkarsh";
    int count() default 0;
}
