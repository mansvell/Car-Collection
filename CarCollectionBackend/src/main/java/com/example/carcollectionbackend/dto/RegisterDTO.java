package com.example.carcollectionbackend.dto;

import lombok.Data;

@Data
public class RegisterDTO {
  private String vorname;
  private String nachname;
  private String email;
  private String password;
}
