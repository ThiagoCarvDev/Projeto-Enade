package com.ads.enade.service;

import com.ads.enade.dto.course.CourseDtoResponse;
import com.ads.enade.dto.user.UserProfileDTO;
import com.ads.enade.dto.user.UserRankingDTO;
import com.ads.enade.entity.Usuario;
import com.ads.enade.exception.UserNotFoundException;
import com.ads.enade.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    // Método para atualizar o score do usuário baseado nas respostas corretas
    public void updateUserScoreAndAttempts(Long userId, int correctAnswers) {
        Usuario usuario = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        // Atualiza o score e incrementa as tentativas
        usuario.setScore(usuario.getScore() + (correctAnswers * 10));
        usuario.setQuizAttempts(usuario.getQuizAttempts() + 1);

        userRepository.save(usuario);
    }

    // Método para zerar os scores diariamente
    @Scheduled(cron = "0 0 0 * * ?") // Executa à meia-noite todos os dias
    public void resetScoresDaily() {
        List<Usuario> usuarios = userRepository.findAll();
        for (Usuario usuario : usuarios) {
            usuario.setScore(0); // Zera o score de cada usuário
        }
        userRepository.saveAll(usuarios);
    }

    // Método para obter o ranking de usuários ordenado por score
    public List<UserRankingDTO> getAllUsersByScore() {
        List<Usuario> usuarios = userRepository.findAllByOrderByScoreDesc();

        return usuarios.stream()
                .filter(user -> user.getScore() > 0) // Filtra usuários com score maior que 0
                .map(user -> new UserRankingDTO(user.getUsername(), user.getScore()))
                .collect(Collectors.toList());
    }

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
