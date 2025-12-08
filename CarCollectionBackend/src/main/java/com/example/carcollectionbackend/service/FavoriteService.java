package com.example.carcollectionbackend.service;

import com.example.carcollectionbackend.Entities.Car;
import com.example.carcollectionbackend.Entities.Favorite;
import com.example.carcollectionbackend.Entities.User;
import com.example.carcollectionbackend.repository.CarRepository;
import com.example.carcollectionbackend.repository.FavoriteRepository;
import com.example.carcollectionbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {

  private final FavoriteRepository favRepo;
  private final UserRepository userRepo;
  private final CarRepository carRepo;

  public List<Favorite> getFavorites(Long userId) {
    User user = userRepo.findById(userId).orElseThrow();
    return favRepo.findByUser(user);
  }

  public Favorite addFavorite(Long userId, Long carId) {
    User user = userRepo.findById(userId).orElseThrow();
    Car car = carRepo.findById(carId).orElseThrow();

    // éviter les doublons
    return favRepo.findByUserAndCar(user, car)
      .orElseGet(() -> favRepo.save(new Favorite(null, user, car)));
  }

  public void removeFavorite(Long userId, Long carId) {
    User user = userRepo.findById(userId).orElseThrow();
    Car car = carRepo.findById(carId).orElseThrow();

    favRepo.findByUserAndCar(user, car)
      .ifPresent(favRepo::delete);
  }
}
