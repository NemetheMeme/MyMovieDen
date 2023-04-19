const signInButton = document.querySelector('.submit-sign-in');

signInButton.addEventListener('click', ()=>{
    const emailInput = document.querySelector('.email');
    const usernameInput = document.querySelector('.username');
    const passwordInput = document.querySelector('.password');
    const passwordConfirmation = document.querySelector('.confirm-password');

    const email = emailInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;

    if(passwordConfirmation !== passwordInput){
        alert('Passwords must be the same!');
    }

    const data = {username, email, password};
     
});
