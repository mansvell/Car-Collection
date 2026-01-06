package com.example.carcollectionbackend.security;

import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .cors(Customizer.withDefaults())
      .authorizeHttpRequests(auth -> auth
        //très important pour le preflight
        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

        //login/register doivent être accessibles sans token
        .requestMatchers("/api/users/**").permitAll()

        // le reste (à adapter plus tard)
        .anyRequest().permitAll()
      );

    return http.build();
  }
}
