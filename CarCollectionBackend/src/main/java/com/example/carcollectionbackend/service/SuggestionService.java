package com.example.carcollectionbackend.service;

import com.example.carcollectionbackend.Entities.Suggestion;
import com.example.carcollectionbackend.repository.SuggestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SuggestionService {

  private final SuggestionRepository repo;

  public List<Suggestion> getPending() {
    return repo.findByStatus("PENDING");
  }

  public Suggestion save(Suggestion s) {
    return repo.save(s);
  }
  public void updateStatus(Long id, String status) {
    Suggestion s = repo.findById(id).orElseThrow();
    s.setStatus(status);
    repo.save(s);
  }

}
