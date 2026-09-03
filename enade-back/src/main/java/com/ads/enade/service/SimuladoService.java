package com.ads.enade.service;

import com.ads.enade.dto.simulado.SimuladoDTOResponse;
import com.ads.enade.entity.Curso;
import com.ads.enade.entity.Questao;
import com.ads.enade.entity.Simulado;
import com.ads.enade.entity.Usuario;
import com.ads.enade.enums.TipoSimulado;
import com.ads.enade.mapper.SimuladoMapper;
import com.ads.enade.repository.QuestaoRepository;
import com.ads.enade.repository.SimuladoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class SimuladoService {

    private final SimuladoRepository simuladoRepository;
    private final QuestaoRepository questaoRepository;
    private final AuthService authService;
    private final UsuarioSimuladoService usuarioSimuladoService;
    private final SimuladoMapper simuladoMapper;

    @Transactional
    public SimuladoDTOResponse gerarSimulado(int quantidadeDeQuestoes){

        if (quantidadeDeQuestoes <= 0) throw new IllegalArgumentException("Quantidade de questões por simulado necessita ser maior que 0");

        List<Questao> questoesParaOSimulado = questaoRepository.buscarDezQuestoes(quantidadeDeQuestoes);

        Usuario usuarioAutenticado = authService.me();

        Curso cursoUsuarioAutenticado = usuarioAutenticado.getCourse();

        log.info("Iniciando geração de simulado com um total de: [{}] questões para o usuário: [{}]",quantidadeDeQuestoes, usuarioAutenticado.getUsername());

        Simulado novoSimulado = Simulado.builder()
                .tipoSimulado(TipoSimulado.SIMULADO)
                .curso(cursoUsuarioAutenticado)
                .dataCriacao(LocalDate.now())
                .titulo("Simulado | ENADE - "+usuarioAutenticado.getUsername())
                .questoes(questoesParaOSimulado)
                .quantidadeDeQuestoes(quantidadeDeQuestoes)
                .build();

        Simulado simuladoSalvo = simuladoRepository.save(novoSimulado);

        log.info("Simulado gerado com sucesso... [{}]", simuladoSalvo.getTitulo());

        usuarioSimuladoService.registrarSimuladoAoUsuario(usuarioAutenticado,simuladoSalvo);

        return simuladoMapper.toDTO(simuladoSalvo);
    }
}
