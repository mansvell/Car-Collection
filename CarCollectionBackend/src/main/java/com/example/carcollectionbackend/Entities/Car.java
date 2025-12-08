package com.example.carcollectionbackend.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="cars")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long cid;

  @ManyToOne
  @JoinColumn(name = "brand_id", referencedColumnName = "bid")
  private Brand brand;

  @Column(nullable=false)
  private String model;
  @Column(nullable=false)
  private Integer year;

  @Column(nullable=false)
  private Integer hp;

  @Column(nullable=false)
  private String category;
  @Column(nullable=false)
  private String logo;
  @Column(nullable=false)
  private String description;

}
