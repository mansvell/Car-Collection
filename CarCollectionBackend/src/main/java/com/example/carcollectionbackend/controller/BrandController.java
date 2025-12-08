package com.example.carcollectionbackend.controller;


import com.example.carcollectionbackend.Entities.Brand;
import com.example.carcollectionbackend.repository.BrandRepository;
import com.example.carcollectionbackend.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BrandController {
  private final BrandService service;

  @GetMapping
  public List<Brand> getAllBrands() {
    return service.getAll();
  }

  @PostMapping
  public Brand save(@RequestBody Brand brand) {
    return service.save(brand);
  }
}
