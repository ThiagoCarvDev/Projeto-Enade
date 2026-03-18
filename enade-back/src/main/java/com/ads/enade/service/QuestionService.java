package com.ads.enade.service;

import com.ads.enade.dto.SubmitAnswerRequest;
import com.ads.enade.dto.SubmitAnswerResponse;
import com.ads.enade.entity.Question;
import com.ads.enade.exception.CourseNotFoundException;
import com.ads.enade.exception.QuestionNotFoundException;
import com.ads.enade.exception.UserNotFoundException;
import com.ads.enade.repository.CourseRepository;
import com.ads.enade.repository.QuestionRepository;
import com.ads.enade.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    private Map<Long, List<Long>> userSentQuestionIds = new HashMap<>(); //trocar lógica (dto talvez)

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    public List<Question> getTechnicalQuestions(Long userId, Long courseId) {

        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found");
        }

        if (courseId == null || !courseRepository.existsById(courseId)) {
            throw new CourseNotFoundException("Course not found");
        }

        List<Question> availableQuestions = questionRepository.findByCourseId(courseId);

        if (availableQuestions.isEmpty()) {
            throw new CourseNotFoundException("No questions found for the course with ID " + courseId);
        }

        List<Long> sentQuestionIds = userSentQuestionIds.computeIfAbsent(userId, k -> new ArrayList<>());

        // Embaralha as perguntas disponíveis
        Collections.shuffle(availableQuestions);

        List<Question> questionsToSend = availableQuestions.stream()
                .filter(q -> !sentQuestionIds.contains(q.getId()))
                .limit(10)
                .collect(Collectors.toList());

        if (questionsToSend.size() < 10) {
            sentQuestionIds.clear();
            questionsToSend = availableQuestions.stream().limit(10).collect(Collectors.toList());
        }

        sentQuestionIds.addAll(questionsToSend.stream().map(Question::getId).collect(Collectors.toList()));
        userSentQuestionIds.put(userId, sentQuestionIds); // Atualiza a lista de perguntas enviadas para o usuário

        return questionsToSend;
    }

    public List<Question> getGeneralQuestions(Long userId) {

        if (!userRepository.existsById(userId)){
            throw new UserNotFoundException("User not found");
        }

        List<Question> availableQuestions = questionRepository.findByCourseIdIsNull();
        List<Long> sentQuestionIds = userSentQuestionIds.computeIfAbsent(userId, k -> new ArrayList<>());

        // Embaralha as perguntas disponíveis
        Collections.shuffle(availableQuestions);

        List<Question> questionsToSend = availableQuestions.stream()
                .filter(q -> !sentQuestionIds.contains(q.getId()))
                .limit(10)
                .collect(Collectors.toList());

        if (questionsToSend.size() < 10) {
            sentQuestionIds.clear();
            questionsToSend = availableQuestions.stream().limit(10).collect(Collectors.toList());
        }

        sentQuestionIds.addAll(questionsToSend.stream().map(Question::getId).collect(Collectors.toList()));
        userSentQuestionIds.put(userId, sentQuestionIds); // Atualiza a lista de perguntas enviadas para o usuário

        return questionsToSend;
    }

    public List<SubmitAnswerResponse> calculateResults(List<SubmitAnswerRequest> answers) {
        List<SubmitAnswerResponse> result = new ArrayList<>();

        for (SubmitAnswerRequest answer : answers) {
            Question question = questionRepository.findById(answer.getQuestionId())
                    .orElseThrow(() -> new QuestionNotFoundException("Pergunta não encontrada: " + answer.getQuestionId()));

            boolean isCorrect = question.getCorrectAnswer().equals(answer.getSelectedOption());

            SubmitAnswerResponse response = new SubmitAnswerResponse(
                    question.getId(),
                    question.getText(),
                    question.getOptionA(),
                    question.getOptionB(),
                    question.getOptionC(),
                    question.getOptionD(),
                    answer.getSelectedOption(),
                    question.getCorrectAnswer(),
                    isCorrect
            );

            result.add(response);
        }

        return result;
    }

}
