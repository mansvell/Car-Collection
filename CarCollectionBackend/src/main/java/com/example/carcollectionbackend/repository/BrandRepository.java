package com.example.carcollectionbackend.repository;

/*Spricht nur mit der DB, CRUD (findAll, findById, save, …)
Retourne des Entities */

import com.example.carcollectionbackend.Entities.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand, Long> {

}

