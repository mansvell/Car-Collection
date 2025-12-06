package com.example.carcollectionbackend.repository;

import com.example.carcollectionbackend.Entities.Car;
import com.example.carcollectionbackend.Entities.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
  List<Car> findByBrand(Brand brand);
  List<Car> findByCategory(String category);
}
