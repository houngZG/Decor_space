document.addEventListener('DOMContentLoaded', function() {
    // use the getElementById becuase this screen is the sub screen of another screens.
    const form = document.getElementById('reset-password-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        window.location.href = '../../index.html';
    });
});