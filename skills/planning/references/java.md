# Java/Spring Boot conventions

## Project files to read (if not already in research summary)
- `application.properties` or `application.yml` (if needed for config)
- One existing test class (to match test patterns)

## Tests
- JUnit 5 + Mockito.
- `@WebMvcTest` for controllers, `@DataJpaTest` for repos, `@SpringBootTest` for integration.
- Match project assertion library.
- Maven: `mvn test -Dtest=ClassName#methodName`. Gradle: `gradle test --tests "ClassName.methodName"`.

## Style
- Constructor injection. Spring layering: Controller -> Service -> Repository.
- DTOs at boundaries. `Optional` for nullable returns.
- Lombok only if project uses it.

## Dependencies
- Maven/Gradle dependency block as first step.

## Security
- Don't expose sensitive details to unauthenticated users.
- Use `when-authorized` not `always` for health endpoint details.
