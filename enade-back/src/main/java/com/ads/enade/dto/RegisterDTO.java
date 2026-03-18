package com.ads.enade.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class RegisterDTO {

    private String username;
    private String email;
    private String password;
    private Set<String> role;
    private Long courseId;

}
