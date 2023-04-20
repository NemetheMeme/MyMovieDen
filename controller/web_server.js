const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const userService = require('../service/user_service');
const movieService = require('../service/movie_service');
const relationshipRepositoryTest = require('../database/repository/movie_user_relationship');

app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, ()=>{
    console.log('App listening on port 3000');
})

app.get('/signin', (req,res) =>{
   res.send( `
   <form id = "signin" action="/signin" method="POST">
        <input name = "email" type="text" class = "email" placeholder="Email">
        <input name = "username" type="text"class = "username" placeholder="Username">
        <input name = "password" type="password"class ="password" placeholder="Password"> 
        <input name = "passwordConfirmation"type = "password" class="confirm-password" placeholder="Confirm Password">
        <input type = "submit" class="submit-sign-in" value="Sign In">
    </form>
    `);
});

app.post('/signin',(req,res)=>{
    console.log('Creating account...');
    userService.register(req.body);
    res.send(`
    <form id = "signin" action="/signin" method="GET">
    <input name = "email" type="text" class = "email" placeholder="Email">
    <input name = "username" type="text"class = "username" placeholder="Username">
    <input name = "password" type="password"class ="password" placeholder="Password"> 
    <input name = "passwordConfirmation"type = "password" class="confirm-password" placeholder="Confirm Password">
    <input type = "submit" class="submit-sign-in" value="Sign In">
</form>`);
});

app.get('/movie', (req,res)=>{

res.send(`
<form id = "movie" action = "/movie" method = "POST">
<input name = "name" type="text"  placeholder="movieName">
<input name = "IDBM_ID" type="text" placeholder="IDMB ID">
<input type = "submit" class="submit-add-movie" value="Add Movie">
`);
});

app.post('/movie', (req,res)=>{
    movieService.addMovieRequest(req.body);
    res.send(`Movie Added`);
});


app.get('/addFavoriteMovie', (req,res)=>{
    res.send(`
    <form id = "movie" action = "/addFavoriteMovie" method = "POST">
    <input name = "email" type="text"  placeholder="User email">
    <input name = "name" type="text" placeholder="Movie name">
    <input type = "submit" class="submit-add-favorite-movie" value="Add favorite Movie">
    `);
});

// prototype that uses name of movie and email of user
app.post('/addFavoriteMovie', (req,res)=>{
  relationshipRepositoryTest.addTest(req.body, req.body); 
});
module.exports = router;