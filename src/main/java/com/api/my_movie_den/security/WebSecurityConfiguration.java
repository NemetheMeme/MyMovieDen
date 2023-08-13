package com.api.my_movie_den.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {

    @Bean
    public static PasswordEncoder passwordEncoder(){return new BCryptPasswordEncoder();}

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http.csrf().disable()
                    .authorizeHttpRequests(requests -> requests
                            .requestMatchers(toH2Console()).permitAll()  // Additional RequestMatcher for H2Database version
                            .requestMatchers("/login", "/logout", "/home", "/login?logout",
                                    "/sign_up", "/register_user", "/login_user",
                                    "/movie_preview", "/css/**", "/js/**", "pic/**", "/").permitAll()
                            .requestMatchers("/favorites").authenticated()
                            .requestMatchers("/update_favorite").authenticated()
                            .anyRequest().authenticated())
                    .headers(headers -> headers.frameOptions().disable())
                    .formLogin((form) -> form
                            .loginPage("/login")
                            .loginProcessingUrl("/login")
                            .defaultSuccessUrl("/home")
                            .permitAll()
                    )
                    .logout((logout) -> logout
                            .logoutUrl("/logout")
                            .logoutSuccessUrl("/home")
                            .permitAll()
                    )
                    .exceptionHandling().accessDeniedPage("/access-denied");
            return http.build();
        }

    }
