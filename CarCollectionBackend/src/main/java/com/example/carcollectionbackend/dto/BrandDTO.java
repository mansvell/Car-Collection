package com.example.carcollectionbackend.dto;

import lombok.Data;

/*Stellt dar, was der Frontend anzeigen muss. Kann enthalten:
      weniger Felder, Mehr Felder, eine unterschiedliche Struktur von Entiites */

@Data
public class BrandDTO {
  private Long bid;
  private String name;
  private String logo;

  private Integer foundedYear;
  private String foundedBy;
  private String currentOwner;
  private Integer employeesApprox;
  private String originCountry;
  private String description;
}
