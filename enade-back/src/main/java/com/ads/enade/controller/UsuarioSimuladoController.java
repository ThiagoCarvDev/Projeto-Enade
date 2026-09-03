package com.ads.enade.controller;

import com.ads.enade.dto.user.UsuarioSimuladoDTOResponse;
import com.ads.enade.service.UsuarioSimuladoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/usuario/simulados")
@RequiredArgsConstructor
public class UsuarioSimuladoController {

    private final UsuarioSimuladoService usuarioSimuladoService;

    @GetMapping
    public ResponseEntity<List<UsuarioSimuladoDTOResponse>> buscarSimuladosDoUsuario(){

        List<UsuarioSimuladoDTOResponse> responses = usuarioSimuladoService.buscarSimuladosUsuario();

        return ResponseEntity.ok(responses);
    }
}
