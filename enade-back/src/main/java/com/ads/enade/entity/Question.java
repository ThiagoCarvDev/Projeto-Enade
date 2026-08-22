package com.ads.enade.entity;

import com.ads.enade.enums.TypeQuestion;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String text;

    @NotBlank
    @Column(name = "option_a")
    private String optionA;

    @NotBlank
    @Column(name = "option_b")
    private String optionB;

    @NotBlank
    @Column(name = "option_c")
    private String optionC;

    @NotBlank
    @Column(name = "option_d")
    private String optionD;

    @NotBlank
    @Column(name = "option_E")
    private String optionE;

    @NotBlank
    @Size(max = 1)
    @Column(name = "correct_answer")
    private String correctAnswer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = true)
    @JsonIgnore
    private Course course;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_question")
    private TypeQuestion typeQuestion;
}
