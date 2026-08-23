package com.ads.enade.dto.alternativa;

public record AlternativaDTORequest (
        String texto,
        Boolean isCorreta,
        String opcaoAlternativa
){
}
