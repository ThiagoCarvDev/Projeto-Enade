package com.ads.enade.controller;

import com.ads.enade.dto.UserProfileDTO;
import com.ads.enade.dto.UserRankingDTO;
import com.ads.enade.security.WebSecurityConfig;
import com.ads.enade.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@SecurityRequirement(name = WebSecurityConfig.SECURITY)
@RequestMapping("/api/users")
@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/ranking")
    public ResponseEntity<List<UserRankingDTO>> getAllUsersByScore() {
        List<UserRankingDTO> users = userService.getAllUsersByScore();
        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile(@RequestParam(name = "userid") Long userId) {
        UserProfileDTO user = userService.getUserProfile(userId);
        return ResponseEntity.ok(user);
    }

}
