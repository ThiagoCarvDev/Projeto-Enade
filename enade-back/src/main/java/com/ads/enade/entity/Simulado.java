package com.ads.enade.entity;

import com.ads.enade.enums.TipoSimulado;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "simulado")
public class Simulado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "titulo")
    private String titulo;

    @NotBlank
    @Column(name = "ano")
    private LocalDate ano;

    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Curso IdCurso;

    @NotBlank
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_simulado")
    private TipoSimulado tipoSimulado;




}
