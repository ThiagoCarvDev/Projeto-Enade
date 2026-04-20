package com.ads.enade.dto.auth;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RegisterDTO {

    private String username;
    private String email;
    private String password;
    private Long courseId;
}
