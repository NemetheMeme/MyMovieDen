package com.api.my_movie_den.repository;

import com.api.my_movie_den.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, String> {
    Movie findByName(String name);
}
