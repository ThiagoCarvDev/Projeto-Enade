package com.ads.enade.security.jwt;

import com.ads.enade.security.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filtro de autenticação que verifica se a requisição contém um token JWT válido.
 * Se o token for válido, autentica o usuário e adiciona os detalhes de autenticação ao contexto de segurança.
 */
@Service
public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException { // Método que faz parte do filtro de segurança, responsável por autenticar usuários com base em um token JWT.
        try {
            String jwt = parseJwt(request); // Extrair o token JWT da requisição

            // Verificar se o token JWT é válido
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                String username = jwtUtils.getUserNameFromJwtToken(jwt); // Extrair o nome de usuário do token JWT

                UserDetails userDetails = userDetailsService.loadUserByUsername(username); // Carregar os detalhes do usuário com base no nome de usuário

                // Criar um objeto de autenticação com os detalhes do usuário
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); // Adicionar detalhes de autenticação da requisição ao objeto de autenticação

                SecurityContextHolder.getContext().setAuthentication(authentication); // Armazenar o objeto de autenticação no contexto de segurança
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e); // Logar qualquer erro que ocorra durante o processo de autenticação
        }

        filterChain.doFilter(request, response); // Continuar com a cadeia de filtros
    }

    private String parseJwt(HttpServletRequest request) { // Método para extrair o token JWT da requisição
        String headerAuth = request.getHeader("Authorization"); // Obter o cabeçalho de autorização da requisição

        // Verificar se o cabeçalho de autorização não é nulo e começa com "Bearer "
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7); // Remove o prefixo "Bearer " do cabeçalho de autorização e retornar o token JWT
        }

        return null; // Se o cabeçalho de autorização não for encontrado ou não começar com "Bearer ", retornar null
    }

}
