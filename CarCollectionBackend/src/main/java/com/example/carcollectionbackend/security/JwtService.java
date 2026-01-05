package com.example.carcollectionbackend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

  /**
   * Un token, c’est juste une chaîne de caractères signée (eyJhbGciVCJ9.qdqwdeqwed.qwdfsdafdsf )
   * - Pour HS256, la clé doit faire au moins 32 caractères (32 bytes)
   * die alte version von jjwt :signWith(SignatureAlgorithm, String) ist unsatbil
   * Personne ne peut modifier le Token sans la clé secrète
   */
  private static final String SECRET = "SUPER_SECRET_KEY_CHANGE_THIS_32_CHARS_MINIMUM!!";

  // Clé cryptographique dérivée du secret
  private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

  //generiert ein JWT Token für den User, das enthält: Mail, Ablaufdatum, eine Cryptographische Unterschrift
  public String generateToken(String email) {
    long expirationMs = 1000L * 60 * 60 * 24; // 24h
    long now = System.currentTimeMillis();

    return Jwts.builder()
      .setSubject(email)
      .setIssuedAt(new Date(now))
      .setExpiration(new Date(now + expirationMs))
      .signWith(key)
      .compact();
  }

  /**
   * Récupère l'email (subject) depuis un token JWT
   */
  public String getEmailFromToken(String token) {
    Claims claims = Jwts.parserBuilder()
      .setSigningKey(key)   //API moderne
      .build()
      .parseClaimsJws(token)
      .getBody();

    return claims.getSubject();
  }
}

