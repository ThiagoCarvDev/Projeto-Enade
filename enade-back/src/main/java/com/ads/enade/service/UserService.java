package com.ads.enade.service;

import com.ads.enade.dto.course.CourseDtoResponse;
import com.ads.enade.dto.user.UserProfileDTO;
import com.ads.enade.entity.Usuario;
import com.ads.enade.exception.UserNotFoundException;
import com.ads.enade.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;


    // Método para buscar perfil do usuário pelo ID
    @Transactional
    public UserProfileDTO getUserProfile(Long userId) {
        Usuario usuario = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        CourseDtoResponse courseDtoResponse = new CourseDtoResponse(usuario.getCourse().getId(), usuario.getCourse().getNome());

        return new UserProfileDTO(usuario.getUsername(), usuario.getEmail(), courseDtoResponse);
    }

    public UserProfileDTO me(){

        Usuario usuario = authService.me();

        CourseDtoResponse courseDtoResponse = new CourseDtoResponse(usuario.getCourse().getId(), usuario.getCourse().getNome());

        return new UserProfileDTO(usuario.getUsername(), usuario.getEmail(), courseDtoResponse);
    }
}
