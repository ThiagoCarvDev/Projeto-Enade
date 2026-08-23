package com.ads.enade.entity;

import com.ads.enade.enums.TipoQuestao;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "questao")
public class Questao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "titulo", length = 150)
    private String titulo;

    @NotBlank
    @Column(name = "enunciado", length = 1000)
    private String enunciado;

    @NotBlank
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_questao_enum")
    private TipoQuestao tipoQuestao;

    @NotBlank
    @Column(name = "area_questao", length = 100)
    private String areaQuestao;

    @NotBlank
    @Column(name = "possui_imagem")
    private Boolean possuiImagem;

    @NotBlank
    @Column(name = "img_url")
    private String imgURL;

    @NotBlank
    @Column(name = "explicacao")
    private String explicacao;

    @NotBlank
    @OneToMany(mappedBy = "questao", cascade = CascadeType.ALL)
    private List<Alternativa> alternativas;

}
