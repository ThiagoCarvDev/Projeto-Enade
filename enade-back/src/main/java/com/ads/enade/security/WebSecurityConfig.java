package com.ads.enade.security;

import com.ads.enade.security.jwt.AuthEntryPointJwt;
import com.ads.enade.security.jwt.AuthTokenFilter;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

/**
 * Configuração de segurança para a aplicação.
 * Esta classe é utilizada para configurar a segurança da aplicação, incluindo a autenticação e autorização.
 */
@Configuration
@EnableMethodSecurity // Anotação para habilitar a segurança em métodos
@SecurityScheme(name = WebSecurityConfig.SECURITY, type = SecuritySchemeType.HTTP, scheme = "bearer", bearerFormat = "JWT")
public class WebSecurityConfig {

    public static final String SECURITY = "bearerSecurity";

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception { // Método para criar uma cadeia de filtros de segurança
        http.csrf(AbstractHttpConfigurer::disable) // Desativa a proteção contra ataques CSRF (PROCURAR MELHORIAS)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler)) // Configura o manipulador de entrada não autorizada
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // Configura a política de criação de sessão como sem estado
                .headers(hearder -> hearder.frameOptions(frame -> frame.sameOrigin())) //Libera o acesso ao H2
                .authorizeHttpRequests(auth -> // Configura as autorizações de solicitações HTTP
                        auth.requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/api/test/**").permitAll()
                                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/h2-console/**").permitAll() // Libera rotas do swagger e h2 (apenas para teste)
                                .anyRequest().authenticated()
                );

        http.authenticationProvider(authenticationProvider()); // Configura o provedor de autenticação

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class); // Adiciona o filtro de autenticação JWT antes do filtro de autenticação de nome de usuário e senha

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://98.85.62.40"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() { // Método para criar um filtro de autenticação JWT
        return new AuthTokenFilter();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() { // Método para criar um provedor de autenticação
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() { // Método para criar um codificador de senha
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception { // Método para criar um gerenciador de autenticação
        return authConfig.getAuthenticationManager();
    }

}
