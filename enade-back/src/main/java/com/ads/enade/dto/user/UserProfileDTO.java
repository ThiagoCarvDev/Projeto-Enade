package com.ads.enade.dto.user;

import com.ads.enade.dto.course.CourseDtoResponse;
import com.ads.enade.entity.Course;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class UserProfileDTO {
    private String username;
    private String email;

    private CourseDtoResponse course;

    public UserProfileDTO(String username, String email, CourseDtoResponse course) {
        this.username = username;
        this.email = email;
        this.course = course;
    }
}
