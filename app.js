document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const contentContainer = document.querySelector('main');
    const cartLink = document.querySelector('.login-cart a[href="#"]');
    //const checkoutButton = document.querySelector('.checkout-button');

    // Function to load content
    function loadContent(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                contentContainer.innerHTML = data;
            })
            .catch(error => console.error('Error fetching content:', error));
    }

    // Load initial home content
    loadContent('view/home.html');

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const url = event.target.getAttribute('href');
            loadContent(url);
        });
    });

    cartLink.addEventListener('click', function(event) {
        event.preventDefault();
        const url = 'view/shopping_cart.html'; 
        loadContent(url);
    });

    // checkoutButton.addEventListener('click', function(event) {
    //     event.preventDefault();
    //     const url = 'view/shipping.html';
    //     loadContent(url);
        
    //     setTimeout(() => {
    //         window.history.back();
    //     }, 2000);
    // });
});
