package com.ads.enade.utils;

public interface EmailService {

    void sendResetPasswordEmail(String email, String resetLink);

}
