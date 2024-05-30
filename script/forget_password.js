document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forget-password-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        window.location.href = 'reset_password.html';
    });
});