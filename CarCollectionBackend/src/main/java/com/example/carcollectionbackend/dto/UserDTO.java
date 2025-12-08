package com.example.carcollectionbackend.dto;

import lombok.Data;

@Data
public class UserDTO {
  private Long id;
  private String vorname;
  private String nachname;
  private String email;
  private String role;
}
