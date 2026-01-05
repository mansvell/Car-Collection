package com.example.carcollectionbackend.dto;

import lombok.Data;

@Data
public class SuggestionCreateDTO {
  private Long userId;

  private String logo;
  private String model;
  private String brand;
  private Integer year;
  private String category;
  private Integer hp;
  private String description;
}

