package com.example.prueba.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador con endpoints públicos adicionales
 */
@RestController
@RequestMapping("/api/v1/public")
public class PublicController {
    
    /**
     * Endpoint público que muestra información sobre la API
     */
    @GetMapping("/about")
    public String getAbout() {
        return "API REST con autenticación JWT - Versión 1.0";
    }
    
    /**
     * Endpoint público que muestra instrucciones de uso
     */
    @GetMapping("/help")
    public String getHelp() {
        return "Para usar esta API:\n" +
               "1. Autentícate con POST /api/v1/auth/login\n" +
               "2. Usa el token devuelto en el encabezado Authorization: Bearer [token]\n" +
               "3. Accede a los endpoints protegidos";
    }
}
