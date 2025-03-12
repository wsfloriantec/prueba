package com.example.prueba.models;

/**
 * Modelo para devolver el token JWT tras una autenticación exitosa.
 */
public class AuthResponse {
    private String token;

    public AuthResponse() {}

    public AuthResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
