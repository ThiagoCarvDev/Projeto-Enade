package com.ads.enade.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ads.enade.dto.quiz.SubmitAnswerRequest;
import com.ads.enade.dto.quiz.SubmitAnswerResponse;
import com.ads.enade.entity.*;
import com.ads.enade.enums.TypeQuestion;
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

        List<Question> questions = List.of(new Question(1L, "Question 1", "A", "B", "C", "D", "A","E" ,course,  TypeQuestion.SPECIFIC));

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
                new Question(1L, "Question 1", "A", "B", "C", "D", "A","E", null, TypeQuestion.GENERAL),
                new Question(1L, "Question 1", "A", "B", "C", "D", "A","E", null, TypeQuestion.GENERAL),
                new Question(1L, "Question 1", "A", "B", "C", "D", "A","E", null, TypeQuestion.GENERAL),
                new Question(1L, "Question 1", "A", "B", "C", "D", "A","E", null, TypeQuestion.GENERAL),
                new Question(1L, "Question 1", "A", "B", "C", "D", "A","E", null, TypeQuestion.GENERAL)
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
        Question question = new Question(1L, "Question 1", "A", "B", "C", "D", "A", "A",null, TypeQuestion.SPECIFIC);
        when(questionRepository.findById(1L)).thenReturn(Optional.of(question));

        List<SubmitAnswerResponse> result = questionService.calculateResults(answers);

        assertEquals(1, result.size());
        assertTrue(result.get(0).isCorrect());
    }

}
