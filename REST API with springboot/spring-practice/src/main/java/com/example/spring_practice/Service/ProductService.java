package com.example.spring_practice.Service;

import com.example.spring_practice.Model.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    List<Product> products= new ArrayList<>(Arrays.asList(
            new Product(1,"Trek Bag",8000),
            new Product(2,"Harness",500),
            new Product(3,"Shoes",3000))
    );

    public List<Product>getListOfProducts(){
        System.out.println(products);
        return products;
    }

    public Product getProductById(int id){
        return products.stream()
                .filter(p -> p.getProdId() == id)
                .findFirst()
                .orElse(new Product(id,"New Default Product",id*20));
    }

    public void addProduct(Product product){
        products.add(product);
    }

    public List<Product> updateProduct(Product product){
        return products.stream()
                .filter(p -> p.getProdId() == product.getProdId())
                .map(
                        p->{
                            p.setPrice(product.getPrice());
                            p.setProdName(product.getProdName());
                            return p;
                        }
                )
                .collect(Collectors.toList());
    }

    public List<Product> deleteProduct(int id){
        products=products.stream()
                .filter(p -> p.getProdId() != id)
                .collect(Collectors.toList());
        return products;
    }
}
