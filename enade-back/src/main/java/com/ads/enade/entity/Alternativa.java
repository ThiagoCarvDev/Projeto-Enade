package com.ads.enade.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "alternativa")
public class Alternativa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "texto", length = 500)
    private String texto;

    @NotBlank
    @Column(name = "is_correta")
    private Boolean isCorreta;

    @ManyToOne
    @JoinColumn(name = "questao_id")
    private Questao questao;

}
