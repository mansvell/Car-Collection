package com.example.carcollectionbackend.controller;

import com.example.carcollectionbackend.Entities.Suggestion;
import com.example.carcollectionbackend.dto.SuggestionDTO;
import com.example.carcollectionbackend.mapper.EntityMapper;
import com.example.carcollectionbackend.service.SuggestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suggestions")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SuggestionController {

  private final SuggestionService service;

  @GetMapping("/pending")
  public List<SuggestionDTO> pending() {
    return service.getPending()
      .stream()
      .map(EntityMapper::toSuggestionDTO)
      .toList();
  }

  @PostMapping
  public SuggestionDTO createSuggestion(@RequestBody Suggestion s) {
    Suggestion saved = service.save(s);
    return EntityMapper.toSuggestionDTO(saved);
  }

  @PutMapping("/{id}/status/{status}")
  public void updateStatus(@PathVariable Long id, @PathVariable String status) {
    service.updateStatus(id, status);
  }
}
