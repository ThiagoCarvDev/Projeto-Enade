package com.ads.enade.controller;

import com.ads.enade.dto.SubmitAnswerRequest;
import com.ads.enade.dto.SubmitAnswerResponse;
import com.ads.enade.entity.Question;
import com.ads.enade.service.QuestionService;
import com.ads.enade.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/quiz")
@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
public class QuizController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private UserService userService;

    @GetMapping("/technical")
    public ResponseEntity<List<Question>> getTechnicalQuestions(@RequestParam(name = "userid") Long userId, @RequestParam(name = "courseid") Long courseId) {
        List<Question> questions = questionService.getTechnicalQuestions(userId, courseId);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/general")
    public ResponseEntity<List<Question>> getGeneralQuestions(@RequestParam(name = "userid") Long userId) {
        List<Question> questions = questionService.getGeneralQuestions(userId);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/submit") // REVER ESSA LÓGICA DO MAP, TROCAR PARA DTO OU ALGO MELHOR.
    public ResponseEntity<Map<String, Object>> submitAnswers(@RequestParam(name = "userid") Long userId, @RequestBody List<SubmitAnswerRequest> answers) {
        List<SubmitAnswerResponse> results = questionService.calculateResults(answers);
        long correctCount = results.stream().filter(SubmitAnswerResponse::isCorrect).count();
        long incorrectCount = results.size() - correctCount;

        userService.updateUserScoreAndAttempts(userId, (int) correctCount);

        Map<String, Object> response = new HashMap<>();
        response.put("results", results);
        response.put("correctCount", correctCount);
        response.put("incorrectCount", incorrectCount);

        return ResponseEntity.ok(response);
    }

}
