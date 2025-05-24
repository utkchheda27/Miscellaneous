package com.example.spring_practice.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @RequestMapping("/")
    public String greet(){
        return "Welcome to home page";
    }

    @GetMapping("/about")
    public String about(){
        return "Welcome to about page";
    }
}
