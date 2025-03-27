package com.eventsphere.controller;

import com.eventsphere.dto.LoginDTO;
import com.eventsphere.dto.UserDTO;
import com.eventsphere.entity.User;
import com.eventsphere.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.register(userDTO));
    }
    
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginDTO loginDTO) {
        return ResponseEntity.ok(userService.login(loginDTO));
    }
}