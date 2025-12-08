package com.example.carcollectionbackend.dto;

import lombok.Data;

@Data
public class CarDTO {
  private Long cid;
  private Long brandId;
  private String brandName;
  private String model;
  private Integer year;
  private Integer hp;
  private String category;
  private String logo;
  private String description;
}
