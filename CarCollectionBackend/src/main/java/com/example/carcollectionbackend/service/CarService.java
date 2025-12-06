package com.example.carcollectionbackend.service;


import com.example.carcollectionbackend.Entities.Car ;
import com.example.carcollectionbackend.Entities.Brand;
import com.example.carcollectionbackend.repository.CarRepository;
import com.example.carcollectionbackend.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {

  private final CarRepository carRepo;
  private final BrandRepository brandRepo;

  public List<Car> getAllCars() {
    return carRepo.findAll();
  }

  public List<Car> getCarsByBrand(Long brandId) {
    Brand brand = brandRepo.findById(brandId).orElseThrow();
    return carRepo.findByBrand(brand);
  }

  public Car save(Car car) {
    return carRepo.save(car);
  }

  public void delete(Long id) {
    carRepo.deleteById(id);
  }
}

