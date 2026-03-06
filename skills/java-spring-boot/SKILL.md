---
name: java-spring-boot
description: "Spring Boot conventions and best practices. Load only when actively writing, reviewing, or debugging Java/Spring Boot code and domain-specific guidance would materially help. Not needed for simple edits or non-code tasks."
---

# Spring Boot best practices

Reference knowledge for writing idiomatic Spring Boot applications. This skill provides reference knowledge for the specialized Java agents (`asd-java-reviewer`, `asd-java-investigator`) and the consolidated `asd-plan-writer` (which handles Java conventions when language is detected as Java).

## Project structure

- Organize code by feature/domain (e.g. `com.example.app.order`, `com.example.app.user`), not by layer
- Use Spring Boot starters to simplify dependency management
- Use Maven or Gradle - detect from existing `pom.xml` or `build.gradle`

## Dependency injection

- Always use constructor-based injection for required dependencies
- Declare dependency fields as `private final`
- Use `@Component`, `@Service`, `@Repository`, `@RestController` appropriately
- Avoid `@Autowired` field injection

## Configuration

- Use `application.yml` or `application.properties` for configuration
- Use `@ConfigurationProperties` for type-safe property binding
- Use Spring Profiles (`application-dev.yml`, `application-prod.yml`) for environment-specific config
- Never hardcode secrets - use environment variables or secret management tools

## Web layer

- Use DTOs for API input/output - never expose JPA entities directly
- Validate request payloads with Bean Validation (`@Valid`, `@NotNull`, `@Size`) on DTOs
- Implement global error handling with `@ControllerAdvice` and `@ExceptionHandler`
- Design consistent RESTful endpoints

## Service layer

- Encapsulate business logic in `@Service` classes
- Services must be stateless
- Use `@Transactional` on service methods - apply at the most granular level necessary
- Use `@Transactional(readOnly = true)` for read-only operations

## Data layer

- Use Spring Data JPA repositories (`JpaRepository` or `CrudRepository`)
- Use `@Query` or Criteria API for complex queries
- Use DTO projections to fetch only necessary data
- Avoid `FetchType.EAGER` on collections - use `@EntityGraph` or `JOIN FETCH` for specific queries
- Always paginate unbounded queries

## Logging

- Use SLF4J: `private static final Logger logger = LoggerFactory.getLogger(MyClass.class);`
- Use parameterized messages: `logger.info("Processing user {}...", userId);`
- Never log sensitive data (passwords, tokens, personal information)

## Testing

- **Unit tests:** JUnit 5 + Mockito for services and components
- **Integration tests:** `@SpringBootTest` for full context, use sparingly
- **Test slices:** `@WebMvcTest` for controllers, `@DataJpaTest` for repositories
- **Testcontainers:** For integration tests with real databases
- Test naming: `*Test.java` for unit, `*IntegrationTest.java` for integration

## Security

- Use Spring Security for authentication and authorization
- Encode passwords with BCrypt
- Use parameterized queries - never concatenate user input into SQL
- Add `@PreAuthorize` or `@Secured` on sensitive endpoints
- Configure CORS explicitly on new endpoints
