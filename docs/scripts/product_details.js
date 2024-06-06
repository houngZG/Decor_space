import Menu from "./menu.js";

class ProductDetailScript {
    constructor(prodetaiL) {
        this.prodetaiL = prodetaiL;
        this.isCounter = false;
    }

    renderProductDetails(item) {
        const data = JSON.parse(item);
        this.addToCard(data);
        console.log(data);

        const wiatForElement = setInterval(() => {
            this.prodetaiL = document.querySelector(".product-container");
            let colorsHtml = '';

            if (!data || typeof data !== 'object') {
                console.error('Invalid item data provided.');
                return;
            }

            if (data.colors && Array.isArray(data.colors)) {
                data.colors.forEach(color => {
                    colorsHtml += `<div class="color-radius" style="background-color: ${color};"></div>`;
                });
            }

            if (this.prodetaiL) {
                clearInterval(wiatForElement);

                var details = `
                    <div class="product-image">
                        <img id="productImage" src="${data.image}" alt="${data.image}">
                    </div>
                    <div class="product-details">
                        <h1 id="title">${data.product_name}</h1>
                        <div class="product-price">
                            <div class="product-details-left">
                                <div class="rating">
                                    ${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}
                                </div>
                                <div class="price">${data.price}</div>
                                <div class="product-origin">Product from: <span>${data.product_from}</span></div>
                            </div>
                            <hr style="margin-inline-start: 10%; margin-inline-end: 10%;">
                            <div class="product-details-right">
                                <div class="color">
                                    <p>Color:</p>
                                    ${colorsHtml}
                                </div>
                                <div class="dimensions">
                                    <span>Width:<br>${data.width} Cm</span><hr>
                                    <span>Height:<br>${data.height} Cm</span><hr>
                                    <span>Warranty:<br>${data.warranty} Year</span>
                                </div>
                            </div>
                        </div>
                        <p class="description">${data.description}</p>
                        <div class="actions">
                            <button class="add-to-cart" id="add-to-card">Add to Cart</button>
                            <button class="order">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                </svg> &nbsp; &nbsp;
                                Order
                            </button>
                        </div>
                    </div>
                `;

                this.prodetaiL.innerHTML = details;
            } else {
               // console.error('Required elements not found.');
            }
        });
    }

    addToCard(itme) {
        const waitHmlElement = setInterval(() => {
            const addCard = document.querySelector("#add-to-card");
            if (addCard) {
                clearInterval(waitHmlElement);
                addCard.addEventListener('click', () => {
                    if (itme) {
                        console.log(itme)
                        const m = new Menu();
                        m.setCounter({isCount: true});
                    }
                    
                });
            } else {
                console.error('Element with ID "add-to-card" not found');
            }
        });
        
    }
}

new ProductDetailScript();
export default ProductDetailScript;
