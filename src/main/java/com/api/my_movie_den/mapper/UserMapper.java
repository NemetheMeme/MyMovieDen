package com.api.my_movie_den.mapper;

import com.api.my_movie_den.dto.UserDto;
import com.api.my_movie_den.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
public class UserMapper {

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User mapToUser(UserDto userDto){
        return User.builder()
                .email(userDto.getEmail())
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .movies(new HashSet<>())
                .build();
    }
}
