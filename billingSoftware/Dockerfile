# Use official JDK image
FROM eclipse-temurin:17-jdk

# Set working dir
WORKDIR /app

# Copy everything to container
COPY . .

# Build the app
RUN ./mvnw clean package -DskipTests

# Expose port (Render will assign $PORT)
EXPOSE 8080

# Run the JAR
CMD ["sh", "-c", "java -jar target/*.jar"]
