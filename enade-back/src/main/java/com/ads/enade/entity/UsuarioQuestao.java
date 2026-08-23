package com.ads.enade.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "usuario_questao")
public class UsuarioQuestao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_simulado_id")
    private UsuarioSimulado IdUsuarioSimulado;

    @ManyToOne
    @JoinColumn(name = "questao_id")
    private Questao IdQuestao;

    @NotBlank
    @Column(name = "is_acerto")
    private Boolean isAcerto;

    @NotBlank
    @Column(name = "data_resposta")
    private LocalDate dataResposta;

    @ManyToOne
    @JoinColumn(name = "alternativa_id")
    private Alternativa IdAlternativa;

}
