package com.ads.enade.controller;

import com.ads.enade.dto.questao.UsuarioQuestaoDTOResponse;
import com.ads.enade.dto.simulado.RespostaUsuarioSimulado;
import com.ads.enade.dto.user.UsuarioSimuladoDTOResponse;
import com.ads.enade.service.UsuarioSimuladoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/resposta")
    public ResponseEntity<UsuarioQuestaoDTOResponse> registrarRespostaDoUsuario(@RequestBody @Valid RespostaUsuarioSimulado request){

        UsuarioQuestaoDTOResponse response = usuarioSimuladoService.registrarRespostaDoUsuario(request);

        return ResponseEntity.ok(response);
    }
}
