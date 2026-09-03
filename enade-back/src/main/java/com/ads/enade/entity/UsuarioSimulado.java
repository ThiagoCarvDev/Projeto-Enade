package com.ads.enade.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "usuario_simulado")
public class UsuarioSimulado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_simulado")
    private Simulado simulado;

    @Column(name = "nota")
    private Double nota;

    @Column(name = "quantidade_acertos")
    private Integer quantidadeAcertos;

    @Column(name = "data_conclusao")
    private LocalDate dataConclusao;


}
