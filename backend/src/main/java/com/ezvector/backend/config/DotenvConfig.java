package com.ezvector.backend.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.util.HashMap;
import java.util.Map;

/**
 * Loads environment variables from .env file into Spring's environment.
 * This runs before Spring Boot's auto-configuration.
 */
public class DotenvConfig implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        ConfigurableEnvironment environment = applicationContext.getEnvironment();
        
        // Load .env file from the project root (backend folder)
        Dotenv dotenv = Dotenv.configure()
                .directory("./")  // Looks in the current working directory
                .ignoreIfMissing()  // Don't fail if .env is missing (useful for production)
                .load();

        // Convert dotenv entries to a Map
        Map<String, Object> dotenvMap = new HashMap<>();
        dotenv.entries().forEach(entry -> {
            dotenvMap.put(entry.getKey(), entry.getValue());
        });

        // Add the .env properties to Spring's environment with high priority
        environment.getPropertySources().addFirst(
            new MapPropertySource("dotenvProperties", dotenvMap)
        );
    }
}
