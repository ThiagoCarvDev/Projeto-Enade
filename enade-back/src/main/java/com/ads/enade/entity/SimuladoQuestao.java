package com.ads.enade.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "simulado_questao")
public class SimuladoQuestao {

    @EmbeddedId
    private SimuladoQuestaoId id;   // <-- aponta pra classe separada, não pra si mesma

    @ManyToOne
    @MapsId("idSimulado")
    @JoinColumn(name = "id_simulado")
    private Simulado simulado;

    @ManyToOne
    @MapsId("idQuestao")
    @JoinColumn(name = "id_questao")
    private Questao questao;

}