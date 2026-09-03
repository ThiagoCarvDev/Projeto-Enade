package com.ads.enade.dto.user;

import com.ads.enade.dto.simulado.SimuladoDTOResponse;

import java.time.LocalDate;

public record UsuarioSimuladoDTOResponse(
        Long id,
        Double nota,
        Integer quantidadeAcertos,
        LocalDate dataConclusao,
        SimuladoDTOResponse simulado
) {
}
