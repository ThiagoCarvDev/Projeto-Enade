package com.ads.enade.service;

import com.ads.enade.dto.user.UsuarioSimuladoDTOResponse;
import com.ads.enade.entity.Simulado;
import com.ads.enade.entity.Usuario;
import com.ads.enade.entity.UsuarioSimulado;
import com.ads.enade.mapper.UsuarioSimuladoMapper;
import com.ads.enade.repository.UsuarioSimuladoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsuarioSimuladoService {

    private final UsuarioSimuladoRepository usuarioSimuladoRepository;
    private final AuthService authService;
    private final UsuarioSimuladoMapper usuarioSimuladoMapper;

    public void registrarSimuladoAoUsuario(Usuario usuario, Simulado simulado){

        UsuarioSimulado novoUsuarioSimulado = UsuarioSimulado.builder()
                .usuario(usuario)
                .simulado(simulado)
                .build();

        usuarioSimuladoRepository.save(novoUsuarioSimulado);
    }

    public List<UsuarioSimuladoDTOResponse> buscarSimuladosUsuario(){

        Usuario usuarioAutenticado = authService.me();

        List<UsuarioSimulado> simuladosUsuario = usuarioSimuladoRepository.buscarTodosOsSimuladosDoUsuario(usuarioAutenticado);

        if (simuladosUsuario.isEmpty()) return List.of();

        return simuladosUsuario
                .stream()
                .map(usuarioSimuladoMapper::toDTO)
                .toList();
    }
}
