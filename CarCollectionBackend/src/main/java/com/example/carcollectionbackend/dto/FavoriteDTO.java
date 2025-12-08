package com.example.carcollectionbackend.dto;

import lombok.Data;

@Data
public class FavoriteDTO {
  private Long id;
  private Long userId;
  private Long carId;
}
