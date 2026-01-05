package com.example.carcollectionbackend.controller;

import com.example.carcollectionbackend.Entities.Car;
import com.example.carcollectionbackend.Entities.Suggestion;
import com.example.carcollectionbackend.dto.SuggestionCreateDTO;
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

  //On reçoit un DTO qui contient userId (pas un objet User complet)
  @PostMapping
  public SuggestionDTO createSuggestion(@RequestBody SuggestionCreateDTO dto) {
    var saved = service.createSuggestionWithUser(dto);
    return EntityMapper.toSuggestionDTO(saved);
  }

  //ADMIN accepte
  @PostMapping("/{id}/accept")
  public Car accept(@PathVariable Long id) {
    return service.acceptSuggestion(id);
  }

  //ADMIN refuse
  @PostMapping("/{id}/reject")
  public void reject(@PathVariable Long id) {
    service.rejectSuggestion(id);
  }

  @PutMapping("/{id}/status/{status}")
  public void updateStatus(@PathVariable Long id, @PathVariable String status) {
    service.updateStatus(id, status);
  }
}
