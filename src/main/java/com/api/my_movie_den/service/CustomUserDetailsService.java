package com.api.my_movie_den.service;


import com.api.my_movie_den.entity.User;
import com.api.my_movie_den.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Log4j2
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(usernameOrEmail);
        if (user != null) {
            return mapToUserDetails(user);
        } else {
            throw new UsernameNotFoundException("Invalid email or password");
        }
    }

    private org.springframework.security.core.userdetails.User mapToUserDetails(User user) {
        var email = user.getEmail();
        var password = user.getPassword();
        List<GrantedAuthority> authorities = Collections.emptyList();

        return new org.springframework.security.core.userdetails.User(email, password, authorities);

    }
}


