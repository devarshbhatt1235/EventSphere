package com.eventsphere.service;

import com.eventsphere.dto.LoginDTO;
import com.eventsphere.dto.UserDTO;
import com.eventsphere.entity.User;
import com.eventsphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User register(UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword()); // In production, password should be encrypted

        return userRepository.save(user);
    }

    public User login(LoginDTO loginDTO) {
        return userRepository.findByEmail(loginDTO.getEmail())
                .filter(user -> user.getPassword().equals(loginDTO.getPassword()))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
}