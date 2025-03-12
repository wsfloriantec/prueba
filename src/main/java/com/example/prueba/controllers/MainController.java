package com.example.prueba.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador principal con endpoints de prueba
 */
@RestController
@RequestMapping("/api/v1")
public class MainController {
    
    /**
     * Endpoint protegido que requiere autenticación
     * Para acceder: Incluir el encabezado "Authorization: Bearer [token]"
     */
    @GetMapping("/protected")
    public String getProtectedInfo() {
        // Obtener la información de autenticación actual
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        
        return "Información protegida: ¡Hola " + username + "! Este endpoint requiere autenticación";
    }
    
    /**
     * Endpoint público accesible sin autenticación
     */
    @GetMapping("/public/info")
    public String getPublicInfo() {
        return "Información pública: Este endpoint es accesible sin autenticación";
    }
    
    /**
     * Endpoint de bienvenida principal (requiere autenticación)
     */
    @GetMapping
    public String getWelcome() {
        return "Bienvenido al API con autenticación JWT";
    }
}
