# Use Maven to build the app
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy source code
COPY backend ./backend

# Build Spring Boot JAR (skip tests to speed up)
RUN mvn -f backend/pom.xml clean package -DskipTests

# Run stage with JDK
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy built JAR from builder stage
COPY --from=builder /app/backend/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port (Render sets $PORT automatically)
EXPOSE 8080

# Start app
CMD ["sh", "-c", "java -jar app.jar --server.port=$PORT"]
