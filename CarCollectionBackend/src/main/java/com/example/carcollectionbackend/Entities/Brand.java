package com.example.carcollectionbackend.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*Stellt die Tabellen der DB dar */

@Entity
@Table(name="brands")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Brand {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long bid;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String logo;

  @Column(name= "founded_year")
  private Integer foundedYear;

  @Column(name= "foundedBy")
  private String foundedBy;

  @Column(name= "currentOwner")
  private String currentOwner;
  @Column(name= "employeesApprox")
  private Integer employeesApprox;

  @Column(name= "originCountry")
  private String originCountry;

  @Column(name= "description")
  private String description;
}
