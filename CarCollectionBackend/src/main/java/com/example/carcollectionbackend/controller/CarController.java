package com.example.carcollectionbackend.controller;

import com.example.carcollectionbackend.Entities.Car;
import com.example.carcollectionbackend.dto.CarDTO;
import com.example.carcollectionbackend.mapper.EntityMapper;
import com.example.carcollectionbackend.service.BrandService;
import com.example.carcollectionbackend.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.example.carcollectionbackend.Entities.Brand

import java.util.List;

/* Controller dient nur dazu: HTTP-Anfrage zu bekommen, Service rufen und Antwort gebn*/
@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CarController {

  private final CarService service;
  private final BrandService brandService;

  @GetMapping
  public List<CarDTO> getAll() {
    return service.getAllCars()
      .stream()
      .map(EntityMapper::toCarDTO)
      .toList();
  }

  @GetMapping("/brand/{brandId}")
  public List<CarDTO> getCarsByBrand(@PathVariable Long brandId) {

    Brand brand = brandService.getBrandById(brandId);

    return service.getCarsByBrand(brandId)
      .stream()
      .map(EntityMapper::toCarDTO)
      .toList();
  }

  @PostMapping
  public CarDTO createCar(@RequestBody Car car) {
    Car saved = service.save(car);
    return EntityMapper.toCarDTO(saved);

  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    service.delete(id);
  }
}
