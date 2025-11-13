package com.ads.enade.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.ses.SesClient;

@Configuration
public class AwsSesConfig {

    /// Aqui é utilizado o serviço Simple Email Service (SES) da Amazon
    /// Essa classe é a classe que irá disparar emails automaticamente (atualmente só para resetar senha)
    /// As configurações das variáveis estão no "application.properties"
    /// São configurações da conta da amazon, os valores estão disponiveis na conta que irá usar

    @Value("${aws.accessKeyId}")
    private String accessKeyId;

    @Value("${aws.secretAccessKey}")
    private String secretAccessKey;

    @Value("${aws.region}")
    private String region;

    @Bean
    public SesClient sesClient() {
        return SesClient.builder()
                .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKeyId, secretAccessKey)))
                .region(Region.of(region))
                .build();
    }

}
