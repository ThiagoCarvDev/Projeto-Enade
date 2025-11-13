package com.ads.enade.utils;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private Long courseId;
    private String email;
    private List<String> roles;

    public JwtResponse(String token, Long id, String username, Long courseId, String email, List<String> roles) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.courseId = courseId;
        this.email = email;
        this.roles = roles;
    }
}
