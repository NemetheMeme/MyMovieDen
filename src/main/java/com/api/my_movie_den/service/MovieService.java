package com.api.my_movie_den.service;

import com.api.my_movie_den.entity.Movie;
import com.api.my_movie_den.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieService {

    @Autowired
    MovieRepository movieRepository;

    public void addNewMovie(Movie movie){
        movieRepository.save(movie);
    }

    public Movie findMovieByTitle(String title){
        return movieRepository.findByName(title);
    }
}
