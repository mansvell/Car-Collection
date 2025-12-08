package com.example.carcollectionbackend.controller;

import com.example.carcollectionbackend.Entities.Suggestion;
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
  public List<Suggestion> pending() {
    return service.getPending();
  }

  @PostMapping
  public Suggestion add(@RequestBody Suggestion s) {
    return service.save(s);
  }
}
