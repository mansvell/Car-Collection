package com.example.carcollectionbackend.controller;

import com.example.carcollectionbackend.Entities.Favorite;
import com.example.carcollectionbackend.dto.FavoriteDTO;
import com.example.carcollectionbackend.mapper.EntityMapper;
import com.example.carcollectionbackend.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
@CrossOrigin("*")
public class FavoriteController {

  private final FavoriteService service;

  @GetMapping("/{userId}")
  public List<FavoriteDTO> getUserFavorites(@PathVariable Long userId) {
    return service.getFavorites(userId)
      .stream()
      .map(EntityMapper::toFavoriteDTO)
      .toList();
  }

  @PostMapping("/{userId}/{carId}")
  public FavoriteDTO addFavorite(@PathVariable Long userId, @PathVariable Long carId) {
    Favorite saved = service.addFavorite(userId, carId);

    return EntityMapper.toFavoriteDTO(saved);
  }

  @DeleteMapping("/{userId}/{carId}")
  public void deleteFavorite(@PathVariable Long userId, @PathVariable Long carId) {
    service.removeFavorite(userId, carId);
  }
}
