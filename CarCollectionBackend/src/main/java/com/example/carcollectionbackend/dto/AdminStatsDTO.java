package com.example.carcollectionbackend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminStatsDTO {
  private long totalCars;
  private long totalBrands;
  private long pendingSuggestions;

  private long totalUsers;

  private long approvedSuggestions;
  private long rejectedSuggestions;

  // optionnel
  private long adminSessions;
}

