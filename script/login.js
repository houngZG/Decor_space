document.addEventListener('DOMContentLoaded', function() {
    const signupButton = document.querySelector('.btn-signup');
    const signinButton = document.querySelector('.btn-signin');
    const forgotPasswordLink = document.querySelector('.forgot-password');

    signupButton.addEventListener('click', function() {
        window.location.href = 'register.html'; 
    });

    signinButton.addEventListener('click', function(event) {
        // if we use button type submit we need to use this 
        // function to prevent sumbit else we can replace submit to normal 'button'.
        event.preventDefault(); 
        window.location.href = '../../index.html';
    });
    
    forgotPasswordLink.addEventListener('click', function() {
        window.location.href = 'forget_password.html';
    });
});