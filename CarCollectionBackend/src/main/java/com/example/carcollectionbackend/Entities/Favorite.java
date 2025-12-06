package com.example.carcollectionbackend.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "favorites",
  uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "car_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Favorite {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "car_id", referencedColumnName = "cid")
  private Car car;
}
