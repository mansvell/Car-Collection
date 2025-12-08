package com.example.carcollectionbackend.service;

import com.example.carcollectionbackend.Entities.Brand ;
import com.example.carcollectionbackend.Entities.Car;
import com.example.carcollectionbackend.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandService {

  private final BrandRepository repo;

  public Brand getBrandById(Long brandId) {
    return repo.findById(brandId)
      .orElseThrow(() -> new RuntimeException("Brand not found : " + brandId));
  }

  public List<Brand> getAll() { return repo.findAll(); }

  public Brand save(Brand b) { return repo.save(b); }
}
