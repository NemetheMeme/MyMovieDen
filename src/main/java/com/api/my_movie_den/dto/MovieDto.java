package com.api.my_movie_den.dto;


import lombok.*;
import lombok.extern.log4j.Log4j2;

import java.util.Arrays;

@Log4j2
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class MovieDto {

    private String id; //
    private String year;//
    private String title;//
    private String genres;//
    private String poster;//
    private String runtime;//
    private String plot;//
    private String rating;//
    private String votes;//
    private String metascore;//
    private String awards;
    private String director;
    private String writer;
    private String actors;
    private String released;//
    private String rated;//
    private String language;//
    private String type;//

    public String[] genreList(){
        if(this.genres == null) return new String[0];
        return Arrays.stream(genres.split(",")).toArray(String[]::new);
    }

    public String[] actorList(){
        if(this.actors == null) return new String[0];
        return Arrays.stream(actors.split(",")).toArray(String[]::new);}

    public String[] writerList(){
        if(this.writer == null) return new String[0];
        return Arrays.stream(writer.split(",")).toArray(String[]::new);
    }
    public String[] directorList(){
        if(this.director == null) return new String[0];
        return Arrays.stream(director.split(",")).toArray(String[]::new);
    }

    public int parsedMetascore(){
        int metascore = 0;
        try{
            metascore = Integer.parseInt(this.metascore);

            return metascore;
        }
        catch (NumberFormatException ex){
                metascore = 0;
        }
        return metascore;
    }

    public String typeCapitalize(){
        if(this.type == null){return null;}
        String firstLetter = this.type.substring(0, 1).toUpperCase();
        String restOfString = this.type.substring(1);
        String capitalized = this.type.substring(0, 1).toUpperCase() + this.type.substring(1);

        return capitalized;
    }
}
