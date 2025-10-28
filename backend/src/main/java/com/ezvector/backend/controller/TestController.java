package com.ezvector.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

/**
 * Test endpoint to verify application and database connectivity.
 * TODO: DELETE THIS CONTROLLER BEFORE PRODUCTION
 */
@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("application", "ezvector-backend");
        
        try (Connection connection = dataSource.getConnection()) {
            response.put("database", "Connected");
            response.put("databaseProductName", connection.getMetaData().getDatabaseProductName());
            response.put("databaseVersion", connection.getMetaData().getDatabaseProductVersion());
            response.put("message", "✅ Database connection successful!");
        } catch (Exception e) {
            response.put("database", "Disconnected");
            response.put("error", e.getMessage());
            response.put("message", "❌ Database connection failed!");
        }
        
        return ResponseEntity.ok(response);
    }
}
