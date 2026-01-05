package com.example.carcollectionbackend.controller;

import com.example.carcollectionbackend.Entities.User;
import com.example.carcollectionbackend.dto.LoginDTO;
import com.example.carcollectionbackend.dto.LoginResponseDTO;
import com.example.carcollectionbackend.dto.RegisterDTO;
import com.example.carcollectionbackend.dto.UserDTO;
import com.example.carcollectionbackend.mapper.EntityMapper;
import com.example.carcollectionbackend.security.JwtService;
import com.example.carcollectionbackend.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

  private final UserService service;
  private final JwtService jwt;

  @PostMapping("/register")
  public UserDTO register(@RequestBody RegisterDTO registerDTO) {

    User newUser = new User();
    newUser.setVorname(registerDTO.getVorname());
    newUser.setNachname(registerDTO.getNachname());
    newUser.setEmail(registerDTO.getEmail());
    newUser.setPassword(registerDTO.getPassword());

    User saved = service.register(newUser);

    return EntityMapper.toUserDTO(saved);
  }

  @PostMapping("/login")
  public LoginResponseDTO login(@RequestBody LoginDTO dto) {

    //ruft Service, um zu überprüfen , ob mail und passw korrekt sind
    User user = service.login(dto.getEmail(), dto.getPassword());

    //Générer token et on renvois un token au frontend pour eviter de renvoyer le mot de passe à chaque requête
    try {
      String token = jwt.generateToken(user.getEmail());

      return new LoginResponseDTO(
        user.getId(),
        user.getVorname(),
        user.getEmail(),
        token
      );
    } catch (Exception e) {
      e.printStackTrace();
      throw new ResponseStatusException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Token generation failed: " + e.getMessage()
      );
    }
  }
}

