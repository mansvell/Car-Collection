package com.example.carcollectionbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MostLikedCarDTO {
  private CarDTO car;
  private long likes;
}


