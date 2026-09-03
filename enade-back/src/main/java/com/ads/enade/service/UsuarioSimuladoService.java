package com.ads.enade.service;

import com.ads.enade.dto.questao.UsuarioQuestaoDTOResponse;
import com.ads.enade.dto.simulado.RespostaUsuarioSimulado;
import com.ads.enade.dto.user.UsuarioSimuladoDTOResponse;
import com.ads.enade.entity.Simulado;
import com.ads.enade.entity.Usuario;
import com.ads.enade.entity.UsuarioSimulado;
import com.ads.enade.exception.ResourceNotFoundException;
import com.ads.enade.mapper.UsuarioSimuladoMapper;
import com.ads.enade.repository.UsuarioSimuladoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsuarioSimuladoService {

    private final UsuarioSimuladoRepository usuarioSimuladoRepository;
    private final AuthService authService;
    private final UsuarioSimuladoMapper usuarioSimuladoMapper;
    private final UsuarioQuestaoService usuarioQuestaoService;

    public UsuarioSimuladoDTOResponse registrarSimuladoAoUsuario(Usuario usuario, Simulado simulado){

        log.info("Iniciando processo de registro de um simulado para o usuário: [{}]", usuario.getUsername());

        UsuarioSimulado novoUsuarioSimulado = UsuarioSimulado.builder()
                .usuario(usuario)
                .simulado(simulado)
                .quantidadeDeQuestoes(simulado.getQuantidadeDeQuestoes())
                .build();

        UsuarioSimulado usuarioSimuladoSalvo = usuarioSimuladoRepository.save(novoUsuarioSimulado);

        log.info("Simulado do usuário salvo com sucesso...");

        return usuarioSimuladoMapper.toDTO(usuarioSimuladoSalvo);
    }

    public List<UsuarioSimuladoDTOResponse> buscarSimuladosUsuario(){

        Usuario usuarioAutenticado = authService.me();

        log.info("Iniciando buscar de simulados do usuário: [{}]", usuarioAutenticado.getUsername());

        List<UsuarioSimulado> simuladosUsuario = usuarioSimuladoRepository.buscarTodosOsSimuladosDoUsuario(usuarioAutenticado);

        if (simuladosUsuario.isEmpty()) return List.of();

        log.info("Simulados encontrados, com um total de [{}]", simuladosUsuario.size());

        return simuladosUsuario
                .stream()
                .map(usuarioSimuladoMapper::toDTO)
                .toList();
    }

    @Transactional
    public UsuarioQuestaoDTOResponse registrarRespostaDoUsuario(RespostaUsuarioSimulado dto){

        UsuarioSimulado usuarioSimulado = usuarioSimuladoRepository.findById(dto.idUsuarioSimulado())
                .orElseThrow(() -> new ResourceNotFoundException("Simulado do usuário com id: "+dto.idUsuarioSimulado()+" não encontrado"));

        UsuarioQuestaoDTOResponse questaoRespondida = usuarioQuestaoService
                .registrarRespostaDoUsuario(usuarioSimulado, dto.idQuestao(), dto.idAlternativa());

        if (questaoRespondida.isAcerto()) usuarioSimulado.adicionarQuantidadeDeAcertos();
        usuarioSimulado.adicionarQuantidadeDeRespostas();

        usuarioSimuladoRepository.save(usuarioSimulado);

        return questaoRespondida;
    }
}
