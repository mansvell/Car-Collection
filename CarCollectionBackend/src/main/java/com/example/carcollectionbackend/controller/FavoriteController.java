package com.example.carcollectionbackend.controller;

import com.example.carcollectionbackend.Entities.Favorite;
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
  public List<Favorite> getUserFavorites(@PathVariable Long userId) {
    return service.getFavorites(userId);
  }

  @PostMapping("/{userId}/{carId}")
  public Favorite add(@PathVariable Long userId, @PathVariable Long carId) {
    return service.addFavorite(userId, carId);
  }

  @DeleteMapping("/{userId}/{carId}")
  public void delete(@PathVariable Long userId, @PathVariable Long carId) {
    service.removeFavorite(userId, carId);
  }
}
