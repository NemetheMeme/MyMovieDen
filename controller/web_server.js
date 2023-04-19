const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const userService = require('../service/user_service');

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

module.exports = router;