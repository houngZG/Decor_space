document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('.signup-form');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        window.location.href = '../../index.html';
    });
});