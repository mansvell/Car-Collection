# ===== Étape 1 : build =====
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src
COPY data ./data

RUN mvn -DskipTests package


# ===== Étape 2 : runtime =====
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar
COPY --from=build /app/data ./data

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]

#Ce que fait ce Dockerfile (en 10 secondes)
 #compile ton backend avec Maven
 #embarque ta base SQLite
 #démarre Spring Boot sur le port 8080
 #fonctionne exactement comme en local
