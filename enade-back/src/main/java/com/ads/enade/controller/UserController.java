package com.ads.enade.controller;

import com.ads.enade.dto.user.UserProfileDTO;
import com.ads.enade.security.WebSecurityConfig;
import com.ads.enade.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile(@RequestParam(name = "userid") Long userId) {
        UserProfileDTO user = userService.getUserProfile(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileDTO> me(){

        UserProfileDTO user = userService.me();

        return ResponseEntity.ok(user);
    }
}
