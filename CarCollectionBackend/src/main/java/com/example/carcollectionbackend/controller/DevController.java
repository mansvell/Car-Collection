/*package com.example.carcollectionbackend.controller;
import com.example.carcollectionbackend.Entities.User;
import com.example.carcollectionbackend.dto.UserDTO;
import com.example.carcollectionbackend.mapper.EntityMapper;
import com.example.carcollectionbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dev")
@RequiredArgsConstructor
public class DevController {

  private final UserService userService;

  @PostMapping("/seed-admin")
  public UserDTO seedAdmin() {
    User u = new User();
    u.setVorname("Mansvell");
    u.setNachname("Nkwanga");
    u.setEmail("GoldGtx@carcollection.com");
    u.setPassword("msv1802NK");     // sera hashé dans register()
    u.setRole("ADMIN");
    return EntityMapper.toUserDTO(userService.register(u));
  }
}*/
