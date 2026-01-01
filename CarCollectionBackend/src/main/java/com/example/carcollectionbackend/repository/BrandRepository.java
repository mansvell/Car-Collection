package com.example.carcollectionbackend.repository;

/*Spricht nur mit der DB, CRUD (findAll, findById, save, …)
Retourne des Entities */

import com.example.carcollectionbackend.Entities.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BrandRepository extends JpaRepository<Brand, Long> {
  Optional<Brand> findByNameIgnoreCase(String name);
}

