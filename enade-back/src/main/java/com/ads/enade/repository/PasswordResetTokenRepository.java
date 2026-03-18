package com.ads.enade.repository;

import com.ads.enade.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);

    //TODO: LEMBRAR DE EXCLUIR AUTOMATICAMENTE AO EXPIRAR O TOKEN (CRIAR LÓGICA)

}
