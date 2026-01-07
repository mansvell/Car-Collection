package com.example.carcollectionbackend.dto;

import lombok.Data;

@Data
public class SuggestionDTO {
  private Long sid;
  private Long userId;
  private String logo;
  private String model;
  private String brand;
  private Integer year;
  private String category;
  private Integer hp;
  private String description;
  private String status;

  private String userVorname;
  private String userNachname;
  private String userEmail;
}
