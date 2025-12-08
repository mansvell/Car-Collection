package com.example.carcollectionbackend.controller;

import com.example.carcollectionbackend.Entities.User;
import com.example.carcollectionbackend.security.JwtService;
import com.example.carcollectionbackend.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

  private final UserService service;
  private final JwtService jwt;

  @PostMapping("/register")
  public User register(@RequestBody User user) {
    return service.register(user);
  }

  @PostMapping("/login")
  public LoginRequest login(@RequestBody LoginRequest request) {
    User user = service.login(request.getEmail(), request.getPassword());
    String token = jwt.generateToken(user.getEmail());

    return new LoginRequest(user.getId(), user.getVorname(), user.getEmail(), token);
  }
}

@Data
class LoginRequest {
  private String email;
  private String password;
}
