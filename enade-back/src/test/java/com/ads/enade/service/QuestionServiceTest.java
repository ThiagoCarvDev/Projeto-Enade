package com.ads.enade.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ads.enade.dto.*;
import com.ads.enade.entity.*;
import com.ads.enade.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

public class QuestionServiceTest {

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CourseRepository courseRepository;

    @InjectMocks
    private QuestionService questionService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetTechnicalQuestionsSuccess() {
        User user = new User();
        user.setId(1L);
        Course course = new Course();
        course.setId(1L);

        List<Question> questions = List.of(new Question(1L, "Question 1", "A", "B", "C", "D", "A", course));

        // Mockando o repositório de usuários e cursos
        when(userRepository.existsById(user.getId())).thenReturn(true); // Mockando existsById
        when(courseRepository.existsById(course.getId())).thenReturn(true); // Mockando existsById do curso
        when(questionRepository.findByCourseId(course.getId())).thenReturn(questions);

        List<Question> result = questionService.getTechnicalQuestions(user.getId(), course.getId());

        assertEquals(1, result.size());
        assertEquals("Question 1", result.get(0).getText());
    }

    @Test
    void testGetGeneralQuestionsSuccess() {
        User user = new User();
        user.setId(1L);

        // Mockando o repositório de usuários
        when(userRepository.existsById(user.getId())).thenReturn(true); // Mockando existsById

        List<Question> generalQuestions = Arrays.asList(
                new Question(1L, "Question 1", "A", "B", "C", "D", "A", null),
                new Question(2L, "Question 2", "A", "B", "C", "D", "B", null),
                new Question(3L, "Question 3", "A", "B", "C", "D", "C", null),
                new Question(4L, "Question 4", "A", "B", "C", "D", "D", null),
                new Question(5L, "Question 5", "A", "B", "C", "D", "A", null)
        );

        // Mockando o repositório de perguntas
        when(questionRepository.findByCourseIdIsNull()).thenReturn(generalQuestions);

        List<Question> result = questionService.getGeneralQuestions(user.getId());

        assertEquals(5, result.size());
        verify(questionRepository, times(1)).findByCourseIdIsNull();
    }

    @Test
    public void testCalculateResultsSuccess() {
        List<SubmitAnswerRequest> answers = List.of(new SubmitAnswerRequest(1L, "A"));
        Question question = new Question(1L, "Question 1", "A", "B", "C", "D", "A", null);
        when(questionRepository.findById(1L)).thenReturn(Optional.of(question));

        List<SubmitAnswerResponse> result = questionService.calculateResults(answers);

        assertEquals(1, result.size());
        assertTrue(result.get(0).isCorrect());
    }

}
