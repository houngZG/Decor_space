document.addEventListener('DOMContentLoaded', function() {
    const checkout = document.querySelector('.pay-button');

    checkout.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'confirm_order.html';
    });
});