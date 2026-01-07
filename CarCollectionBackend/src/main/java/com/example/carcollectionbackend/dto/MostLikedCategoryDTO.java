package com.example.carcollectionbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MostLikedCategoryDTO {
  private String category;
  private long likes;
}
