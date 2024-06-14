import ContentLoader from './content_loader.js';
import DesignInspirationScript from './design_inspiration.js';
import ConfirmOrderScript from './confirm_order.js';

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav ul li a');
    const cartLink = document.querySelector('a[href="#"]');
    const contentLoader = new ContentLoader();
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
                scriptUrl = './scripts/content_loader.js';
            } else if (url === './view/product_details.html') {
                scriptUrl = './scripts/product_details.js';
            } else if (url === './view/shopping_cart.html') {
                scriptUrl = './scripts/shopping_cart.js';
            } else if (url === './view/design_inspiration.html') {
                scriptUrl = './scripts/design_inspiration.js';
                new DesignInspirationScript();
            }else if (url === './view/confirm_order.html') {
                scriptUrl = './scripts/confirm_order.js';
                new ConfirmOrderScript();
            }

            contentLoader.loadContent(url, scriptUrl);
        });
    });

    if (cartLink) {
        cartLink.addEventListener('click', function (event) {
            event.preventDefault();
            const url = './view/shopping_cart.html';
            const scriptUrl = './scripts/shopping_cart.js';
            contentLoader.loadContent(url, scriptUrl);
        });
    } 
});

export function waitForElement(selectors, callback, interval = 100) {
    if (!Array.isArray(selectors)) {
        selectors = [selectors];
    }

    const htmlInterval = setInterval(() => {
        const elements = selectors.map(selector => document.querySelector(selector));
        const allElementsPresent = elements.every(element => element !== null);

        if (allElementsPresent) {
            clearInterval(htmlInterval);
            callback(...elements);
        }
    }, interval);
}



