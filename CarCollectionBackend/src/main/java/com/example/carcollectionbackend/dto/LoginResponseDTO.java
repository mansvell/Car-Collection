package com.example.carcollectionbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
  private Long id;
  private String vorname;
  private String email;
  private String token;
}
