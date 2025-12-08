package com.example.carcollectionbackend.service;


import com.example.carcollectionbackend.Entities.User;
import com.example.carcollectionbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository repo;
  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

  public User register(User user) {
    //Vérifier si email existe déjà
    if (repo.findByEmail(user.getEmail()).isPresent()) {
      throw new RuntimeException("Email existiert bereits");
    }

    // Hash password
    user.setPassword(encoder.encode(user.getPassword()));
    return repo.save(user);
  }

  public User login(String email, String password) {
    User user = repo.findByEmail(email)
      .orElseThrow(() -> new RuntimeException("User not found"));

    // Vérifier le hash
    if (!encoder.matches(password, user.getPassword())) {
      throw new RuntimeException("Invalid password");
    }

    return user;
  }

}
