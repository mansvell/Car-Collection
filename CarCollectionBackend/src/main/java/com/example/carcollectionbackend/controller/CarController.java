package com.example.carcollectionbackend.controller;

import com.example.carcollectionbackend.Entities.Car;
import com.example.carcollectionbackend.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/* Controller dient nur dazu: HTTP-Anfrage zu bekommen, Service rufen und Antwort gebn*/
@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CarController {

  private final CarService service;

  @GetMapping
  public List<Car> getAll() {
    return service.getAllCars();
  }

  @GetMapping("/brand/{id}")
  public List<Car> byBrand(@PathVariable Long id) {
    return service.getCarsByBrand(id);
  }

  @PostMapping
  public Car add(@RequestBody Car car) {
    return service.save(car);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    service.delete(id);
  }
}
