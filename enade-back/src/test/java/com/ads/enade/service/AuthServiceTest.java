package com.ads.enade.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ads.enade.dto.*;
import com.ads.enade.entity.*;
import com.ads.enade.enums.ERole;
import com.ads.enade.repository.*;
import com.ads.enade.security.UserDetailsImpl;
import com.ads.enade.security.jwt.JwtUtils;
import com.ads.enade.utils.EmailService;
import com.ads.enade.utils.JwtResponse;
import com.ads.enade.utils.MessageResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

public class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Mock
    private EmailService emailService;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private CourseRepository courseRepository;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAuthenticateUserSuccess() {

        LoginDTO loginRequest = new LoginDTO();
        loginRequest.setUsername("testuser");
        loginRequest.setPassword("password");

        Authentication authentication = mock(Authentication.class);
        UserDetailsImpl userDetails = mock(UserDetailsImpl.class);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(jwtUtils.generateJwtToken(authentication)).thenReturn("jwt-token");

        JwtResponse response = authService.authenticateUser(loginRequest);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtUtils, times(1)).generateJwtToken(authentication);
    }

    @Test
    public void testRegisterUserSuccess() {

        RegisterDTO signUpRequest = new RegisterDTO();
        signUpRequest.setUsername("testuser");
        signUpRequest.setEmail("testemail@test.com");
        signUpRequest.setPassword("password");
        signUpRequest.setCourseId(1L);
        signUpRequest.setRole(Set.of("user"));

        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("testemail@test.com")).thenReturn(false);
        when(roleRepository.findByName(ERole.ROLE_USER)).thenReturn(Optional.of(new Role(ERole.ROLE_USER)));
        when(courseRepository.findById(1L)).thenReturn(Optional.of(new Course(1L, "Test Course")));
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");

        MessageResponse response = authService.registerUser(signUpRequest);

        assertEquals("User registered successfully!", response.getMessage());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    public void testSendResetPasswordEmailSuccess() {

        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setEmail("testemail@test.com");

        User user = new User("testuser", "testemail@test.com", "password");
        when(userRepository.findByEmail("testemail@test.com")).thenReturn(Optional.of(user));

        authService.sendResetPasswordEmail(emailDTO);

        verify(passwordResetTokenRepository, times(1)).save(any(PasswordResetToken.class));
        verify(emailService, times(1)).sendResetPasswordEmail(eq("testemail@test.com"), anyString());
    }

    @Test
    public void testResetPasswordSuccess() {

        ResetPasswordDTO resetPasswordDTO = new ResetPasswordDTO();
        resetPasswordDTO.setToken("token");
        resetPasswordDTO.setNewPassword("newPassword");

        PasswordResetToken token = new PasswordResetToken("token", new User("testuser", "testemail@test.com", "password"));
        when(passwordResetTokenRepository.findByToken("token")).thenReturn(Optional.of(token));

        authService.resetPassword(resetPasswordDTO);

        verify(userRepository, times(1)).save(any(User.class));
        verify(passwordResetTokenRepository, times(1)).delete(token);
    }

}
