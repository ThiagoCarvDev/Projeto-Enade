package com.ads.enade.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ads.enade.dto.user.UserRankingDTO;
import com.ads.enade.entity.Usuario;
import com.ads.enade.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

public class UsuarioServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testUpdateUserScoreSuccess() {
        Long userId = 1L;
        Usuario usuario = new Usuario("testuser", "testemail@test.com", "password");
        usuario.setScore(50);
        when(userRepository.findById(userId)).thenReturn(Optional.of(usuario));

        userService.updateUserScoreAndAttempts(userId, 5);

        assertEquals(100, usuario.getScore());
        verify(userRepository, times(1)).save(usuario);
    }

    @Test
    public void testGetAllUsersByScoreSuccess() {
        List<Usuario> usuarios = List.of(new Usuario("user1", "email1", "100"),
                                    new Usuario("user2", "email2", "90"));
        usuarios.get(0).setScore(100);
        usuarios.get(1).setScore(90);
        when(userRepository.findAllByOrderByScoreDesc()).thenReturn(usuarios);

        List<UserRankingDTO> result = userService.getAllUsersByScore();

        assertEquals(2, result.size());

        assertEquals("user1", result.get(0).getUsername());
        assertEquals(100, result.get(0).getScore());

        assertEquals("user2", result.get(1).getUsername());
        assertEquals(90, result.get(1).getScore());
    }
}
