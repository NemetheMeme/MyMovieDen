package com.api.my_movie_den.controller;

import com.api.my_movie_den.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;

public class BaseController {

    public void addUserNameToModel(Model model, Authentication authentication, UserService userService){

        if(authentication != null) {
            String username = userService.usernameOfUser(authentication.getName());
            model.addAttribute("user_username",  username + "'s");
        }
        else{
            model.addAttribute("user_username", "My");
        }
    }
}
