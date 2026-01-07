package com.example.carcollectionbackend.repository;



import com.example.carcollectionbackend.Entities.Favorite;
import com.example.carcollectionbackend.Entities.User;
import com.example.carcollectionbackend.Entities.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

  Optional<Favorite> findByUserAndCar(User user, Car car);

  List<Favorite> findByUser(User user);

  @Query("""
  SELECT f.car.cid, COUNT(f.id)
  FROM Favorite f
  GROUP BY f.car.cid
  ORDER BY COUNT(f.id) DESC
""")
  List<Object[]> findMostLikedCar();

  @Query("""
    SELECT f.car.category, COUNT(f.id)
    FROM Favorite f
    GROUP BY f.car.category
    ORDER BY COUNT(f.id) DESC
  """)
  List<Object[]> findTopCategoryByLikes();
}
