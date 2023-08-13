package com.api.my_movie_den.service;

import com.api.my_movie_den.dto.UserDto;
import com.api.my_movie_den.entity.Movie;
import com.api.my_movie_den.entity.User;
import com.api.my_movie_den.mapper.UserMapper;
import com.api.my_movie_den.repository.MovieRepository;
import com.api.my_movie_den.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserMapper userMapper;
    @Autowired
    MovieRepository movieRepository;

 // returns false if it already exists
    public boolean register(UserDto userDto){
        User existingUser  = userRepository.findByEmail(userDto.getEmail());
        boolean userAlreadyExists = existingUser != null;

        if(!userAlreadyExists) {
            User user = userMapper.mapToUser(userDto);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public void addMovie(Movie movie, String email){

        User user = userRepository.findByEmail(email);
        user.addMovie(movie);
        userRepository.save(user);

    }
    public void removeMovie(String movieName, String email){
        Movie movie = movieRepository.findByName(movieName);
        if(movie != null){
            User user = userRepository.findByEmail(email);
            user.removeMovie(movie);
            userRepository.save(user);
        }
    }

    public Set<Movie> getAllMoviesOfUser(String email){
        User user  = userRepository.findByEmail(email);
        return user.getMovies();
    }

    public boolean movieAlreadyInFavouriteList(String movieName, String email){
        if(movieName == null || email == null) return false;

        User user = userRepository.findByEmail(email);

        return user.movieExists(movieName);
    }

    public String usernameOfUser(String email){
        User user = userRepository.findByEmail(email);
        if(user == null){
            return "";
        }
        return user.getUsername();
    }

}
