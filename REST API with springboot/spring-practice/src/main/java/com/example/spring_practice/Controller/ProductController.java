package com.example.spring_practice.Controller;

import com.example.spring_practice.Model.Product;
import com.example.spring_practice.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/products")
    public List<Product> getProducts(){
        return productService.getListOfProducts();
    }

    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable int id){
        return productService.getProductById(id);
    }

    @PostMapping("/products")
    public void addProduct(@RequestBody Product product){
        System.out.println(product);
        productService.addProduct(product);
    }

    @PutMapping("/products")
    public List<Product> updateProduct(@RequestBody Product product){
        System.out.println(product);
        return productService.updateProduct(product);
    }

    @DeleteMapping("/products/{id}")
    public List<Product> deleteProduct(@PathVariable int id){
        return productService.deleteProduct(id);
    }
}
