package com.ads.enade.service;

import com.ads.enade.dto.questao.QuestaoDTORequest;
import com.ads.enade.dto.questao.QuestaoDTOResponse;
import com.ads.enade.entity.Alternativa;
import com.ads.enade.entity.Questao;
import com.ads.enade.enums.TipoQuestao;
import com.ads.enade.repository.QuestaoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class QuestaoService {

    private final QuestaoRepository questaoRepository;

    public void registerQuestion(QuestaoDTORequest request){

        Assert.notNull(request, "Questão para salvamento não pode ser nula");

        if (request.alternativas().isEmpty()) throw new IllegalArgumentException("Alternativas da questão não pode vir vazia");

        log.info("Iniciando processo dee registro de uma nova questão: [{}]", request.titulo());

        Questao novaQuestao = Questao.builder()
                .titulo(request.titulo())
                .enunciado(request.enunciado())
                .tipoQuestao(TipoQuestao.from(request.tipoQuestao()))
                .areaQuestao(request.areaQuestao())
                .possuiImagem(request.possuiImagem())
                .imgURL(request.imgURL())
                .explicacao(request.explicacao())
                .build();

        List<Alternativa> alternativasParaSalvar = request.alternativas()
                .stream()
                .map(alternativa -> Alternativa.builder()
                        .texto(alternativa.texto())
                        .isCorreta(alternativa.isCorreta())
                        .opcaoAlternativa(alternativa.opcaoAlternativa())
                        .questao(novaQuestao)
                        .build())
                .toList();

        novaQuestao.setAlternativas(alternativasParaSalvar);

        questaoRepository.save(novaQuestao);

        log.info("Questão salva com sucesso...");
    }
}
