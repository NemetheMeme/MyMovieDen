package com.api.my_movie_den.controller;

import com.api.my_movie_den.dto.UserDto;
import com.api.my_movie_den.service.MovieService;
import com.api.my_movie_den.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;



@Controller
public class UserController  {

        @Autowired
        UserService userService;
        @Autowired
        MovieService movieService;

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder)
    {
        StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);
        webDataBinder.registerCustomEditor(String.class ,stringTrimmerEditor);
    }

    @RequestMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/sign_up")
    public String signup(Model model) {
        model.addAttribute("user", new UserDto());
        return "sign-up";}

    @PostMapping("/register_user")
    public String register(
            @ModelAttribute("user") @Valid @RequestBody UserDto user,
            BindingResult bindingResult,
            Model model){

        boolean successful = userService.register(user);
        if (!successful) bindingResult.rejectValue("email", null, "User already registered");

        if(bindingResult.hasErrors()){
            model.addAttribute("user", user);
            return "sign-up";
        }



        return "redirect:/login";
    }

    @PostMapping("/login_user")
        public String loginUser(){
            return "redirect:/home";
        }

}
