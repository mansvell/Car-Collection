package com.example.carcollectionbackend.service;


import com.example.carcollectionbackend.Entities.User;
import com.example.carcollectionbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

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

    //le password hashé en "dafdsfjksdghekb"
    user.setPassword(encoder.encode(user.getPassword()));

    if (user.getRole() == null || user.getRole().isBlank()) {
      user.setRole("USER");
    }
    return repo.save(user);
  }

  //on prüfen si le mail existe ,si oui on regarde le password correspondant au mail u.getPassword()
  public User login(String email, String password) {
    User u = repo.findByEmail(email)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid mail"));

    //Wichtig: man muss nie schreiben equals() ,denn das Password ist gehasht. (!u.getPassword().equals(password)) {
    if (!encoder.matches(password, u.getPassword())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
    }
    return u;
  }

}
