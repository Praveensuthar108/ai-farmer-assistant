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
        user.setRole(request.getRole() != null ? request.getRole() : "USER");
        
        // Admin registrations require approval, regular users are auto-approved
        if ("ADMIN".equals(user.getRole())) {
            user.setIsApproved(false);
        } else {
            user.setIsApproved(true);
        }
        
        user.setLatitude(request.getLatitude());
        user.setLongitude(request.getLongitude());
        user.setLocation(request.getLocation());

        user = userRepository.save(user);

        String token = jwtUtil.generateToken(user.getPhone(), user.getId());

        AuthResponse response = new AuthResponse(token, user.getId(), user.getName(), user.getPhone(), user.getLanguage());
        response.setRole(user.getRole());
        response.setIsApproved(user.getIsApproved());
        return response;
    }

    public AuthResponse loginUser(LoginRequest request) {
        User user = userRepository.findByPhone(request.getPhone())
                .orElseThrow(() -> new RuntimeException("Invalid phone or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid phone or password");
        }
        
        // Check if admin is approved
        if ("ADMIN".equals(user.getRole()) && !user.getIsApproved()) {
            throw new RuntimeException("Your admin account is pending approval. Please wait for approval from the main administrator.");
        }

        String token = jwtUtil.generateToken(user.getPhone(), user.getId());

        AuthResponse response = new AuthResponse(token, user.getId(), user.getName(), user.getPhone(), user.getLanguage());
        response.setRole(user.getRole());
        response.setIsApproved(user.getIsApproved());
        return response;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}

// Made with Bob
