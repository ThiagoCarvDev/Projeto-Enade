package com.ads.enade.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserProfileDTO {
    private String username;
    private String email;

    public UserProfileDTO(String username, String email) {
        this.username = username;
        this.email = email;
    }

}
