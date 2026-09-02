package com.ads.enade.controller;

import com.ads.enade.dto.questao.QuestaoDTORequest;
import com.ads.enade.dto.questao.QuestaoDTOResponse;
import com.ads.enade.service.QuestaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questao")
@RequiredArgsConstructor
public class QuestaoController {

    private final QuestaoService questaoService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<QuestaoDTOResponse> registerQuestion(@RequestBody QuestaoDTORequest request){

        QuestaoDTOResponse response = questaoService.registerQuestion(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<QuestaoDTOResponse> findById(@PathVariable Long id){

        QuestaoDTOResponse response = questaoService.findById(id);

        return ResponseEntity.ok(response);
    }
}
