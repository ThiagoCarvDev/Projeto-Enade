package com.ads.enade.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    private final String securityFormat = "Bearer Authentication";

    @Bean
    public OpenAPI openAPI(){
        return new OpenAPI()
                .info(new Info()
                        .title("ENADE API Documentation")
                        .description("Documetation from ENADE for Developers")
                        .version("v1.0")
                        .contact(new Contact().name("Enade Suporte").email("suporte.enade@gmail.com"))
                )
                .addSecurityItem(new SecurityRequirement().addList(securityFormat))
                .components(new Components().addSecuritySchemes(securityFormat, createApiKeyOpenApi()));
    }

    private SecurityScheme createApiKeyOpenApi(){
        return new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .bearerFormat("JWT")
                .scheme("Bearer");
    }
}