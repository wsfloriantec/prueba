package com.example.prueba.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.prueba.models.User;

import jakarta.annotation.PostConstruct;

/**
 * Servicio para gestionar usuarios y autenticación.
 * En un entorno real, esto se conectaría a una base de datos.
 */
@Service
public class UserService implements UserDetailsService {
    
    // Base de datos simulada con usuarios en memoria
    private Map<String, User> users = new HashMap<>();
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    /**
     * Inicializa algunos usuarios de prueba
     */
    @PostConstruct
    public void init() {
        // Crear algunos usuarios de prueba
        User user1 = new User("usuario1", passwordEncoder.encode("password1"));
        User user2 = new User("usuario2", passwordEncoder.encode("password2"));
        
        users.put(user1.getUsername(), user1);
        users.put(user2.getUsername(), user2);
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = users.get(username);
        if (user == null) {
            throw new UsernameNotFoundException("Usuario no encontrado: " + username);
        }
        return user;
    }
    
    /**
     * Verifica si las credenciales son válidas para un usuario.
     */
    public boolean validateCredentials(String username, String rawPassword) {
        User user = users.get(username);
        if (user == null) {
            return false;
        }
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }
}
