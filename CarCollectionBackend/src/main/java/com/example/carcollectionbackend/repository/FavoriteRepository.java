package com.example.carcollectionbackend.repository;



import com.example.carcollectionbackend.Entities.Favorite;
import com.example.carcollectionbackend.Entities.User;
import com.example.carcollectionbackend.Entities.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

  Optional<Favorite> findByUserAndCar(User user, Car car);

  List<Favorite> findByUser(User user);
}
