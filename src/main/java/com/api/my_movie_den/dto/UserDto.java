package com.api.my_movie_den.dto;

import com.api.my_movie_den.validation.PasswordMatch;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@PasswordMatch(
        field = "password",
        fieldMatch = "checkPassword"
)
public class UserDto {

    @NotEmpty(message = "Enter a valid username")
    private String username;

    @NotEmpty(message = "Enter a valid email")
    private String email;

    @NotEmpty(message = "Password can not be empty")
    private String password;

    @NotEmpty(message = "Check password can not be empty")
    private String checkPassword;
}
