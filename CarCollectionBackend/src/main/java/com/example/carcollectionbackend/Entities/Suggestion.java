package com.example.carcollectionbackend.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="suggestions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Suggestion {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long sid;

  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;

  @Column(nullable = false)
  private String logo;

  @Column(nullable = false)
  private String model;
  @Column(nullable = false)
  private String brand;
  @Column(nullable = false)
  private Integer year;

  @Column(nullable = false)
  private String category;
  @Column(nullable = false)
  private Integer hp;

  @Column(nullable = false)
  private String description;
  @Column(nullable = false)
  private String status = "PENDING";
}
