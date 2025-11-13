package com.ads.enade.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.*;

@Service
public class SesEmailSender implements EmailService {

    private final SesClient sesClient;

    private static final Logger logger = LoggerFactory.getLogger(SesEmailSender.class);

    @Autowired
    public SesEmailSender(SesClient sesClient) {
        this.sesClient = sesClient;
    }

    @Override
    public void sendResetPasswordEmail(String email, String resetLink) {
        String subject = "Redefina sua Senha - ENADE.Quiz"; //assunto do email
        String body = "Clique no link abaixo para redefinir sua senha: " + resetLink; //mensagem que vai no email com o link, ver para colocar em html dps

        SendEmailRequest request = SendEmailRequest.builder()
                .source("inserir email cadastrado na aws ses aqui") //endereço que vai enviar os emails
                .destination(Destination.builder()
                        .toAddresses(email)
                        .build())
                .message(Message.builder()
                        .subject(Content.builder().data(subject).build())
                        .body(Body.builder()
                                .text(Content.builder().data(body).build())
                                .build())
                        .build())
                .build();

        SendEmailResponse response = sesClient.sendEmail(request);
        if (response.sdkHttpResponse().isSuccessful()) {
            logger.info("Email sent successfully.");
        } else {
            logger.error("Failed to send the email. Status code: {}", response.sdkHttpResponse().statusCode());
        }
    }

}
