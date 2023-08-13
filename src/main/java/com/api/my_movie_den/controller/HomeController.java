package com.api.my_movie_den.controller;

import com.api.my_movie_den.repository.UserRepository;
import com.api.my_movie_den.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController extends BaseController{

    @Autowired
    UserService userService;

    @GetMapping(value = {"/home", "/"})
    public String getMainPage(Model model, Authentication authentication){
        this.addUserNameToModel(model, authentication, this.userService);
        return "home";
    }

    @GetMapping("/error")
    public String error() {
        return "redirect:/home";
}
}
