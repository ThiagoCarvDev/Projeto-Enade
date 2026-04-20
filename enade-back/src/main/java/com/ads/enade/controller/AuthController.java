package com.ads.enade.controller;

import com.ads.enade.dto.auth.EmailDTO;
import com.ads.enade.dto.auth.LoginDTO;
import com.ads.enade.dto.auth.RegisterDTO;
import com.ads.enade.dto.auth.ResetPasswordDTO;
import com.ads.enade.security.WebSecurityConfig;
import com.ads.enade.service.AuthService;
import com.ads.enade.utils.JwtResponse;
import com.ads.enade.utils.MessageResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@SecurityRequirement(name = WebSecurityConfig.SECURITY)
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginDTO loginRequest) {
        JwtResponse response = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody RegisterDTO signUpRequest) {
        MessageResponse response = authService.registerUser(signUpRequest);
        if (response.getMessage().startsWith("Error")) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<MessageResponse> sendResetPasswordEmail(@RequestBody EmailDTO emailDTO) {
        authService.sendResetPasswordEmail(emailDTO);
        return ResponseEntity.ok(new MessageResponse("Reset password email sent successfully!"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<MessageResponse> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        authService.resetPassword(resetPasswordDTO);
        return ResponseEntity.ok(new MessageResponse("Password reset successfully!"));
    }

}
