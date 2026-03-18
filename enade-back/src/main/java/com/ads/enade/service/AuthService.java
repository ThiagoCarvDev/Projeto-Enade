package com.ads.enade.service;

import com.ads.enade.dto.EmailDTO;
import com.ads.enade.dto.LoginDTO;
import com.ads.enade.dto.RegisterDTO;
import com.ads.enade.dto.ResetPasswordDTO;
import com.ads.enade.entity.Course;
import com.ads.enade.entity.PasswordResetToken;
import com.ads.enade.entity.Role;
import com.ads.enade.entity.User;
import com.ads.enade.enums.ERole;
import com.ads.enade.exception.*;
import com.ads.enade.repository.CourseRepository;
import com.ads.enade.repository.PasswordResetTokenRepository;
import com.ads.enade.repository.RoleRepository;
import com.ads.enade.repository.UserRepository;
import com.ads.enade.security.UserDetailsImpl;
import com.ads.enade.security.jwt.JwtUtils;
import com.ads.enade.utils.EmailService;
import com.ads.enade.utils.JwtResponse;
import com.ads.enade.utils.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private CourseRepository courseRepository;

    public JwtResponse authenticateUser(LoginDTO loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        Long courseId = userDetails.getCourseId();

        return new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                courseId,
                userDetails.getEmail(),
                roles);
    }

    public MessageResponse registerUser(RegisterDTO signUpRequest) {

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new UsernameAlreadyTakenException("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new EmailAlreadyInUseException("Error: Email is already in use!");
        }

        Course course = courseRepository.findById(signUpRequest.getCourseId())
                .orElseThrow(() -> new CourseNotFoundException("Error: Course is not found."));

        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                passwordEncoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RoleNotFoundException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RoleNotFoundException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RoleNotFoundException("Error: Role is not found."));
                        roles.add(modRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RoleNotFoundException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        user.setCourse(course);
        userRepository.save(user);

        return new MessageResponse("User registered successfully!");
    }

    public void sendResetPasswordEmail(EmailDTO emailDTO) {

        //TODO: O EMAIL TEM QUE SER VERIFICADO NA AMAZON, SE FOR PARA PRODUÇÃO, NÃO PRECISA VERIFICAR.

        User user = userRepository.findByEmail(emailDTO.getEmail())
                .orElseThrow(() -> new EmailNotFoundException("Email not found."));

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken(token, user);
        passwordResetTokenRepository.save(resetToken);

        String resetLink = "98.85.62.40/src/pages/novaSenha.html?token=" + token; //TODO: LEMBRAR DE COLOCAR O SITE
        emailService.sendResetPasswordEmail(user.getEmail(), resetLink);
    }

    public void resetPassword(ResetPasswordDTO resetPasswordDTO) {
        PasswordResetToken tokenOptional = passwordResetTokenRepository.findByToken(resetPasswordDTO.getToken())
                .orElseThrow(() -> new InvalidTokenException("Invalid or expired token."));

        if (tokenOptional.getExpiryDate().before(new Date())) {
            throw new InvalidTokenException("Expired token.");
        }

        User user = tokenOptional.getUser();
        user.setPassword(passwordEncoder.encode(resetPasswordDTO.getNewPassword()));
        userRepository.save(user);

        passwordResetTokenRepository.delete(tokenOptional);
    }

}
