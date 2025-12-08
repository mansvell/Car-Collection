package com.example.carcollectionbackend.controller;


import com.example.carcollectionbackend.Entities.Brand;
import com.example.carcollectionbackend.dto.BrandDTO;
import com.example.carcollectionbackend.mapper.EntityMapper;
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
  public List<BrandDTO> getAllBrands() {
    return service.getAll()
      .stream()
      .map(EntityMapper::toBrandDTO)
      .toList();
  }

  @PostMapping
  public BrandDTO createBrand(@RequestBody Brand brand) {
    Brand saved = service.save(brand);
    return EntityMapper.toBrandDTO(saved);
  }
}
