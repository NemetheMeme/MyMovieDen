package com.api.my_movie_den.controller;

import com.api.my_movie_den.dto.MovieDto;
import com.api.my_movie_den.entity.Movie;
import com.api.my_movie_den.service.MovieService;
import com.api.my_movie_den.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import org.springframework.ui.Model;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class MovieController extends BaseController {

    @Autowired
    UserService userService;
    @Autowired
    MovieService movieService;

    @GetMapping(value = {"/movie_preview", "update_favorite"})
    public String movieTemplate(@ModelAttribute MovieDto movieDto, Model model, Authentication authentication) {
        this.addUserNameToModel(model, authentication, this.userService);
        boolean isAddedToFavorites = false;

        if(authentication != null) {
            isAddedToFavorites = userService.movieAlreadyInFavouriteList(movieDto.getTitle(), authentication.getName());
        }

        model.addAttribute("existsFM", isAddedToFavorites);
        model.addAttribute("movie", movieDto);

        return "movie_template";
    }

    @PostMapping("/movie_preview")
    public String processMovieData(@RequestBody MovieDto movieDto, RedirectAttributes redirectAttributes) {
        redirectAttributes.addFlashAttribute("movie", movieDto);
        return "redirect:/movie_preview";
    }

    @PostMapping("/update_favorite")
    public String updateFavorite(@RequestBody MovieDto movieDto, Authentication authentication) {
        String user = authentication.getName();
        boolean favorite = userService.movieAlreadyInFavouriteList(movieDto.getTitle(), user);
        Movie movie = Movie.builder()
                .id(movieDto.getId())
                .name(movieDto.getTitle())
                .poster(movieDto.getPoster())
                .rating(movieDto.getRating())
                .build();

        if (favorite) {
            userService.removeMovie(movieDto.getTitle(), user);
        } else {
            if (movieService.findMovieByTitle(movieDto.getTitle()) == null) {
                movieService.addNewMovie(movie);
            }

            userService.addMovie(movie, user);
        }

        return "redirect:/movie_preview";
    }

    @GetMapping("/favorites")

    public String favoriteMovies(Model model, Authentication authentication) {
        this.addUserNameToModel(model, authentication, this.userService);
        model.addAttribute("favorites", userService.getAllMoviesOfUser(authentication.getName()));
        return "/favorite_movies";
    }
}




