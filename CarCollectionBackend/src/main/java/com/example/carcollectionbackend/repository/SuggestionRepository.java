package com.example.carcollectionbackend.repository;


import com.example.carcollectionbackend.Entities.Suggestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {
  List<Suggestion> findByStatus(String status);
}

