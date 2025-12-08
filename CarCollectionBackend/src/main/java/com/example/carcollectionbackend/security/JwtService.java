package com.example.carcollectionbackend.security;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;
import java.util.Date;

@Service
public class JwtService {
  private final String SECRET = "SUPER_SECRET_KEY_CHANGE_THIS";

  public String generateToken(String email) {
    long expiration = 1000 * 60 * 60 * 24; // 24h

    return Jwts.builder()
      .setSubject(email)
      .setExpiration(new Date(System.currentTimeMillis() + expiration))
      .signWith(SignatureAlgorithm.HS256, SECRET)
      .compact();
  }

  public String getEmailFromToken(String token) {
    return Jwts.parser()
      .setSigningKey(SECRET)
      .parseClaimsJws(token)
      .getBody()
      .getSubject();
  }
}
