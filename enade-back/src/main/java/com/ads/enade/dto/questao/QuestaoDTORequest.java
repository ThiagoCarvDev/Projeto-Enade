package com.ads.enade.dto.questao;

import com.ads.enade.dto.alternativa.AlternativaDTORequest;

import java.util.List;

public record QuestaoDTORequest (
        String titulo,
        String enunciado,
        String tipoQuestao,
        String areaQuestao,
        Boolean possuiImagem,
        String imgURL,
        String explicacao,
        List<AlternativaDTORequest> alternativas
){
}
