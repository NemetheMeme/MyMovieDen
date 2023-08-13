package com.api.my_movie_den.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "movies")
public class Movie {

    @Id
    private String id;
    private String name;
    private String poster;
    private String rating;

    @ManyToMany(mappedBy = "movies", fetch = FetchType.EAGER)
    private Set<User> users;

}

