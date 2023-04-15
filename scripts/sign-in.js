const signInButton = document.querySelector('.submit-sign-in');

signInButton.addEventListener('click', ()=>{
    const emailInput = document.querySelector('.email');
    const usernameInput = document.querySelector('.username');
    const passwordInput = document.querySelector('.password');

    const email = emailInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;

    const data = {username, email, password};
     
});
