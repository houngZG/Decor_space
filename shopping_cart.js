document.addEventListener('DOMContentLoaded', function() {
    const checkout = document.querySelector('.checkout-button');

    checkout.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'shipping.html';
    });
});