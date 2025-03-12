package com.example.prueba.controllers;

import com.example.prueba.models.AuthResponse;
import com.example.prueba.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.prueba.models.AuthRequest;
import com.example.prueba.services.UserService;

/**
 * Controlador para la autenticación de usuarios y generación de tokens
 */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    
    /**
     * Endpoint para iniciar sesión y obtener un token JWT
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody AuthRequest authRequest) {
        // Validar las credenciales del usuario
        if (!userService.validateCredentials(authRequest.getUsername(), authRequest.getPassword())) {
            throw new BadCredentialsException("Credenciales inválidas");
        }

        // Cargar detalles del usuario para generar el token
        final UserDetails userDetails = userService.loadUserByUsername(authRequest.getUsername());

        // Generar el token JWT
        final String jwt = jwtUtil.generateToken(userDetails);

        // Devolver el token en la respuesta
        return ResponseEntity.ok(new AuthResponse(jwt));
    }
}
