package com.example.carcollectionbackend.mapper;

import com.example.carcollectionbackend.dto.*;
import com.example.carcollectionbackend.Entities.*;

/* Entity in DTO umwandeln und umgekehrt, vermeidet die Duplikation des Code*/

public class EntityMapper {

  public static UserDTO toUserDTO(User u) {
    UserDTO dto = new UserDTO();
    dto.setId(u.getId());
    dto.setVorname(u.getVorname());
    dto.setNachname(u.getNachname());
    dto.setEmail(u.getEmail());
    dto.setRole(u.getRole());
    return dto;
  }

  public static CarDTO toCarDTO(Car c) {
    CarDTO dto = new CarDTO();
    dto.setCid(c.getCid());
    dto.setBrandId(c.getBrand().getBid());
    dto.setBrandName(c.getBrand().getName());
    dto.setModel(c.getModel());
    dto.setYear(c.getYear());
    dto.setHp(c.getHp());
    dto.setCategory(c.getCategory());
    dto.setLogo(c.getLogo());
    dto.setDescription(c.getDescription());
    return dto;
  }

  public static BrandDTO toBrandDTO(Brand b) {
    BrandDTO dto = new BrandDTO();
    dto.setBid(b.getBid());
    dto.setName(b.getName());
    dto.setLogo(b.getLogo());

    dto.setFoundedYear(b.getFoundedYear());
    dto.setFoundedBy(b.getFoundedBy());
    dto.setCurrentOwner(b.getCurrentOwner());
    dto.setEmployeesApprox(b.getEmployeesApprox());
    dto.setOriginCountry(b.getOriginCountry());
    dto.setDescription(b.getDescription());
    return dto;
  }

  public static SuggestionDTO toSuggestionDTO(Suggestion s) {
    SuggestionDTO dto = new SuggestionDTO();
    dto.setSid(s.getSid());
    dto.setUserId(s.getUser() != null ? s.getUser().getId() : null);

    //infos du user sur les Vorschläge
    if (s.getUser() != null) {
      dto.setUserVorname(s.getUser().getVorname());
      dto.setUserNachname(s.getUser().getNachname());
      dto.setUserEmail(s.getUser().getEmail());
    }

    dto.setLogo(s.getLogo());
    dto.setModel(s.getModel());
    dto.setBrand(s.getBrand());
    dto.setYear(s.getYear());
    dto.setCategory(s.getCategory());
    dto.setHp(s.getHp());
    dto.setDescription(s.getDescription());
    dto.setStatus(s.getStatus());
    return dto;
  }

  public static FavoriteDTO toFavoriteDTO(Favorite f) {
    FavoriteDTO dto = new FavoriteDTO();
    dto.setId(f.getId());
    dto.setUserId(f.getUser().getId());
    dto.setCarId(f.getCar().getCid());
    return dto;
  }
}
