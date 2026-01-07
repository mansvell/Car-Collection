package com.example.carcollectionbackend.service;

import com.example.carcollectionbackend.Entities.Brand;
import com.example.carcollectionbackend.Entities.Car;
import com.example.carcollectionbackend.Entities.Suggestion;
import com.example.carcollectionbackend.Entities.User;
import com.example.carcollectionbackend.dto.SuggestionCreateDTO;
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

  public List<Suggestion> getPending() { //ADMIN: récupérer toutes les suggestions "PENDING"
    return repo.findByStatus("PENDING");
  }
  public List<Suggestion> getPendingUser() {
    return repo.findByStatusWithUser("PENDING");
  }


  public Suggestion savee(Suggestion s) {
    return repo.save(s);
  }
  public void updateStatus(Long id, String status) {
    Suggestion s = repo.findById(id).orElseThrow();
    s.setStatus(status);
    repo.save(s);
  }

  //créer une suggestion à partir du DTO (qui contient userId)
  public Suggestion createSuggestionWithUser(SuggestionCreateDTO dto) {
    User u = userRepo.findById(dto.getUserId()).orElseThrow();
    Suggestion s = new Suggestion();

    s.setUser(u);
    s.setLogo(dto.getLogo());
    s.setModel(dto.getModel());
    s.setBrand(dto.getBrand());
    s.setYear(dto.getYear());
    s.setCategory(dto.getCategory());
    s.setHp(dto.getHp());
    s.setDescription(dto.getDescription());
    s.setStatus("PENDING");

    return savee(s);
  }

  //Admin accepte : créer Brand + Car, puis status APPROVED
  @Transactional
  public Car acceptSuggestion(Long suggestionId) {
    Suggestion s = repo.findById(suggestionId).orElseThrow();

    if (!"PENDING".equalsIgnoreCase(s.getStatus())) {
      throw new IllegalStateException("Suggestion is not PENDING.");
    }

    Brand brand = brandRepo.findByNameIgnoreCase(s.getBrand()) //récupérer ou créer la Brand
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
