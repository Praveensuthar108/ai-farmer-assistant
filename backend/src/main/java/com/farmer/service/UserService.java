package com.farmer.service;

import com.farmer.dto.AuthResponse;
import com.farmer.dto.LoginRequest;
import com.farmer.dto.UserRegistrationRequest;
import com.farmer.entity.User;
import com.farmer.repository.UserRepository;
import com.farmer.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse registerUser(UserRegistrationRequest request) {
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone number already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setLanguage(request.getLanguage());
        user.setLatitude(request.getLatitude());
        user.setLongitude(request.getLongitude());

        user = userRepository.save(user);

        String token = jwtUtil.generateToken(user.getPhone(), user.getId());

        return new AuthResponse(token, user.getId(), user.getName(), user.getPhone(), user.getLanguage());
    }

    public AuthResponse loginUser(LoginRequest request) {
        User user = userRepository.findByPhone(request.getPhone())
                .orElseThrow(() -> new RuntimeException("Invalid phone or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid phone or password");
        }

        String token = jwtUtil.generateToken(user.getPhone(), user.getId());

        return new AuthResponse(token, user.getId(), user.getName(), user.getPhone(), user.getLanguage());
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}

// Made with Bob
