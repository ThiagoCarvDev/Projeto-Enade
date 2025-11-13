package com.ads.enade.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ads.enade.dto.UserProfileDTO;
import com.ads.enade.dto.UserRankingDTO;
import com.ads.enade.entity.User;
import com.ads.enade.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

public class UserServiceTest {

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
        User user = new User("testuser", "testemail@test.com", "password");
        user.setScore(50);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        userService.updateUserScoreAndAttempts(userId, 5);

        assertEquals(100, user.getScore());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testGetAllUsersByScoreSuccess() {
        List<User> users = List.of(new User("user1", "email1", "100"),
                                    new User("user2", "email2", "90"));
        users.get(0).setScore(100);
        users.get(1).setScore(90);
        when(userRepository.findAllByOrderByScoreDesc()).thenReturn(users);

        List<UserRankingDTO> result = userService.getAllUsersByScore();

        assertEquals(2, result.size());

        assertEquals("user1", result.get(0).getUsername());
        assertEquals(100, result.get(0).getScore());

        assertEquals("user2", result.get(1).getUsername());
        assertEquals(90, result.get(1).getScore());
    }

    @Test
    public void testGetUserProfileSuccess() {
        Long userId = 1L;
        User user = new User("testuser", "testemail@test.com", "password");
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        UserProfileDTO profile = userService.getUserProfile(userId);

        assertEquals("testuser", profile.getUsername());
        assertEquals("testemail@test.com", profile.getEmail());
    }

}
