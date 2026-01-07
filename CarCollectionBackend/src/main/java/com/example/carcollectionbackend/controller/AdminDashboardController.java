package com.example.carcollectionbackend.controller;

import com.example.carcollectionbackend.Entities.Car;
import com.example.carcollectionbackend.dto.AdminStatsDTO;
import com.example.carcollectionbackend.dto.MostLikedCarDTO;
import com.example.carcollectionbackend.dto.MostLikedCategoryDTO;
import com.example.carcollectionbackend.mapper.EntityMapper;
import com.example.carcollectionbackend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminDashboardController {

  private final CarRepository carRepo;
  private final BrandRepository brandRepo;
  private final SuggestionRepository suggestionRepo;
  private final UserRepository userRepo;
  private final FavoriteRepository favoriteRepo;

  @GetMapping("/stats")
  public AdminStatsDTO stats() {
    long totalCars = carRepo.count();
    long totalBrands = brandRepo.count();
    long pending = suggestionRepo.countByStatus("PENDING");

    long totalUsers = userRepo.count();

    long approved = suggestionRepo.countByStatus("APPROVED");
    long rejected = suggestionRepo.countByStatus("REJECTED");

    long adminSessions = 1; // placeholder (on fera mieux après)

    return new AdminStatsDTO(
      totalCars, totalBrands, pending,
      totalUsers,
      approved, rejected,
      adminSessions
    );
  }

  @GetMapping("/most-liked-car")
  public MostLikedCarDTO mostLikedCar() {

    List<Object[]> rows = favoriteRepo.findMostLikedCar();
    if (rows.isEmpty()) {
      return new MostLikedCarDTO(null, 0);
    }

    Long carId = (Long) rows.get(0)[0];
    Long likes = (Long) rows.get(0)[1];

    Car car = carRepo.findById(carId).orElse(null);

    return new MostLikedCarDTO(
      car != null ? EntityMapper.toCarDTO(car) : null,
      likes != null ? likes : 0
    );
  }


  @GetMapping("/top-category")
  public MostLikedCategoryDTO topCategory() {
    List<Object[]> rows = favoriteRepo.findTopCategoryByLikes();
    if (rows.isEmpty()) {
      return new MostLikedCategoryDTO("-", 0);
    }

    String category = (String) rows.get(0)[0];
    Long likes = (Long) rows.get(0)[1];

    return new MostLikedCategoryDTO(
      category != null ? category : "-",
      likes != null ? likes : 0
    );
  }
  @GetMapping("/users/count")
  public long countAllUsers() {
    return userRepo.count();
  }

  @GetMapping("/suggestions/approved/count")
  public long countApprovedSuggestions() {
    return suggestionRepo.countByStatus("APPROVED");
  }

  @GetMapping("/suggestions/rejected/count")
  public long countRejectedSuggestions() {
    return suggestionRepo.countByStatus("REJECTED");
  }

}

