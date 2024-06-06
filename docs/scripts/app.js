import ContentLoader from '../scripts/content_loader.js';

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav ul li a');
    const cartLink = document.querySelector('a[href="#"]');
    const contentContainer = document.getElementById('content');
    const contentLoader = new ContentLoader(contentContainer);
    contentLoader.loadContent('./view/home.html', '');
    
    function setInitialNavSelection() {
        const firstNavLink = document.querySelector('nav ul li a');
        if (firstNavLink) {
            firstNavLink.classList.add('selected-nav');
        }
    }
    setInitialNavSelection();

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const url = event.target.getAttribute('href');
            let scriptUrl;

            navLinks.forEach(navLink => {
                navLink.classList.remove('selected-nav');
            });

            event.target.classList.add('selected-nav');

            if (url === './view/furniture.html') {
                scriptUrl = './script/furniture.js';
            } else if (url === './view/product_details.html') {
                scriptUrl = './script/product_details.js';
            } else if (url === './view/shopping_cart.html') {
                scriptUrl = './script/shopping_cart.js';
            }

            contentLoader.loadContent(url, scriptUrl);
        });
    });

    if (cartLink) {
        cartLink.addEventListener('click', function (event) {
            event.preventDefault();
            const url = 'view/shopping_cart.html';
            contentLoader.loadContent(url);
        });
    }

});