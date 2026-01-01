package com.example.carcollectionbackend.service;

import com.example.carcollectionbackend.Entities.Brand;
import com.example.carcollectionbackend.Entities.Car;
import com.example.carcollectionbackend.Entities.Suggestion;
import com.example.carcollectionbackend.Entities.User;
import com.example.carcollectionbackend.repository.BrandRepository;
import com.example.carcollectionbackend.repository.CarRepository;
import com.example.carcollectionbackend.repository.SuggestionRepository;
import com.example.carcollectionbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SuggestionService {

  private final SuggestionRepository repo;
  private final BrandRepository brandRepo;
  private final CarRepository carRepo;
  private final UserRepository userRepo;

  public List<Suggestion> getPending() {
    return repo.findByStatus("PENDING");
  }

  public Suggestion save(Suggestion s) {
    return repo.save(s);
  }
  public void updateStatus(Long id, String status) {
    Suggestion s = repo.findById(id).orElseThrow();
    s.setStatus(status);
    repo.save(s);
  }

  // suggestion proprement avec userId
  public Suggestion createSuggestionWithUser(
    Long userId,
    String logo,
    String model,
    String brand,
    Integer year,
    String category,
    Integer hp,
    String description
  ) {
    User u = userRepo.findById(userId).orElseThrow();
    Suggestion s = new Suggestion();

    s.setUser(u);
    s.setLogo(logo);
    s.setModel(model);
    s.setBrand(brand);
    s.setYear(year);
    s.setCategory(category);
    s.setHp(hp);
    s.setDescription(description);
    s.setStatus("PENDING");

    return repo.save(s);
  }

  //Admin accepte : créer Brand + Car, puis status APPROVED
  @Transactional
  public Car acceptSuggestion(Long suggestionId) {
    Suggestion s = repo.findById(suggestionId).orElseThrow();

    if (!"PENDING".equalsIgnoreCase(s.getStatus())) {
      throw new IllegalStateException("Suggestion is not PENDING.");
    }

    Brand brand = brandRepo.findByNameIgnoreCase(s.getBrand())
      .orElseGet(() -> {
        Brand b = new Brand();
        b.setName(s.getBrand());

        // Brand.logo est NOT NULL -> on met le logo de la suggestion comme fallback
        b.setLogo(s.getLogo());

        return brandRepo.save(b);
      });

    Car car = new Car();
    car.setBrand(brand);
    car.setModel(s.getModel());
    car.setYear(s.getYear());
    car.setHp(s.getHp());
    car.setCategory(s.getCategory());
    car.setLogo(s.getLogo());
    car.setDescription(s.getDescription());

    Car savedCar = carRepo.save(car);

    s.setStatus("APPROVED");
    repo.save(s);

    return savedCar;
  }

  //Admin refuse : status REJECTED
  public void rejectSuggestion(Long suggestionId) {
    Suggestion s = repo.findById(suggestionId).orElseThrow();
    if (!"PENDING".equalsIgnoreCase(s.getStatus())) return;
    s.setStatus("REJECTED");
    repo.save(s);
  }
}
