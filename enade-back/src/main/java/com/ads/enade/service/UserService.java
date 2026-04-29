package com.ads.enade.service;

import com.ads.enade.dto.course.CourseDtoResponse;
import com.ads.enade.dto.user.UserProfileDTO;
import com.ads.enade.dto.user.UserRankingDTO;
import com.ads.enade.entity.User;
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
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        // Atualiza o score e incrementa as tentativas
        user.setScore(user.getScore() + (correctAnswers * 10));
        user.setQuizAttempts(user.getQuizAttempts() + 1);

        userRepository.save(user);
    }

    // Método para zerar os scores diariamente
    @Scheduled(cron = "0 0 0 * * ?") // Executa à meia-noite todos os dias
    public void resetScoresDaily() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            user.setScore(0); // Zera o score de cada usuário
        }
        userRepository.saveAll(users);
    }

    // Método para obter o ranking de usuários ordenado por score
    public List<UserRankingDTO> getAllUsersByScore() {
        List<User> users = userRepository.findAllByOrderByScoreDesc();

        return users.stream()
                .filter(user -> user.getScore() > 0) // Filtra usuários com score maior que 0
                .map(user -> new UserRankingDTO(user.getUsername(), user.getScore()))
                .collect(Collectors.toList());
    }

    // Método para buscar perfil do usuário pelo ID
    @Transactional
    public UserProfileDTO getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        CourseDtoResponse courseDtoResponse = new CourseDtoResponse(user.getCourse().getId(), user.getCourse().getName());

        return new UserProfileDTO(user.getUsername(), user.getEmail(), courseDtoResponse);
    }

    public UserProfileDTO me(){

        User user = authService.me();

        CourseDtoResponse courseDtoResponse = new CourseDtoResponse(user.getCourse().getId(), user.getCourse().getName());

        return new UserProfileDTO(user.getUsername(),user.getEmail(), courseDtoResponse);
    }
}
