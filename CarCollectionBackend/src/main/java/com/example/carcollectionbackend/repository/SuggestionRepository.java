package com.example.carcollectionbackend.repository;


import com.example.carcollectionbackend.Entities.Suggestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {
  List<Suggestion> findByStatus(String status);

  long countByStatus(String status);//(PENDING / APPROVED / REJECTED)

  @Query("SELECT s FROM Suggestion s JOIN FETCH s.user WHERE s.status = :status")
  List<Suggestion> findByStatusWithUser(@Param("status") String status);

}

