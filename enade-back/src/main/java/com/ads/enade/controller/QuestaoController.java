package com.ads.enade.controller;

import com.ads.enade.dto.questao.QuestaoDTORequest;
import com.ads.enade.dto.questao.QuestaoDTOResponse;
import com.ads.enade.service.QuestaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/questao")
@RequiredArgsConstructor
public class QuestaoController {

    private final QuestaoService questaoService;

    @PostMapping
    public ResponseEntity<Void> registerQuestion(@RequestBody QuestaoDTORequest request){

        questaoService.registerQuestion(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
