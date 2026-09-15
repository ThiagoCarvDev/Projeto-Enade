package com.ads.enade.security;

import com.ads.enade.entity.Usuario;
import com.ads.enade.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Serviço para carregar detalhes do usuário por nome de usuário.
 * Esta classe é utilizada para buscar um usuário no banco de dados e construir um objeto UserDetailsImpl com os detalhes do usuário.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException { // Método para carregar um usuário por nome de usuário
        Usuario usuario = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario não encontrado pelo email: " + email));

        return UserDetailsImpl.build(usuario); // Retorna um objeto UserDetailsImpl construído a partir do usuário encontrado
    }

}
