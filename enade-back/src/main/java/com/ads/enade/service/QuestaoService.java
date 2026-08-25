package com.ads.enade.service;

import com.ads.enade.dto.alternativa.AlternativaDTORequest;
import com.ads.enade.dto.questao.QuestaoDTORequest;
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

        validarEstruturaDaQuestao(request);

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

    private void validarEstruturaDaQuestao(QuestaoDTORequest request){

        Assert.notNull(request, "Questão para salvamento não pode ser nula");

        if (request.alternativas().size() != 5) {
            throw new IllegalArgumentException("ALternativas da questão não estão no quantitativo correto = [" + request.alternativas().size() + "]");
        }

        if (request.possuiImagem() == true && (request.imgURL() == null || request.imgURL().isBlank())){
            throw new IllegalArgumentException("Houve uma inconsistencia na estrutura da questão relacionado a imagem");
        }

        List<AlternativaDTORequest> alternativas = request.alternativas();

        for (int i = 0; i < alternativas.size(); i++){

            if (i == 4){
                break;
            }
            AlternativaDTORequest alternativa = request.alternativas().get(i);
            if (alternativa.opcaoAlternativa().equalsIgnoreCase(alternativas.get(i + 1).opcaoAlternativa())){
                throw new IllegalArgumentException("As alternativas da questão não podem ser repetir");
            }
        }
    }
}
