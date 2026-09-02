package com.ads.enade.controller;

import com.ads.enade.dto.simulado.SimuladoDTOResponse;
import com.ads.enade.service.SimuladoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/simulado")
@RequiredArgsConstructor
public class SimuladoController {

    private final SimuladoService simuladoService;

    @PostMapping
    public ResponseEntity<SimuladoDTOResponse> buscarSimulado(@RequestParam int quantidadeDeQuestoes){

        SimuladoDTOResponse response = simuladoService.gerarSimulado(quantidadeDeQuestoes);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
