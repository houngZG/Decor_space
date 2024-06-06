localStorage.getItem("shopping");

class ShoppingCardScript {
    constructor() {
        this.init();
    }

    init() {
        // this.quantityChange();
    }

    readAndWriteCard(product) {
        const prd = JSON.parse(product);
        console.log(prd.price);
        this.quantityChange(prd.price);
        const elementWaiting = setInterval(() => {
            const data = document.querySelector(".table");
            var productHTML = '';

            if (data) {
                clearInterval(elementWaiting);

                productHTML = `
                    <thead>
                        <tr>
                            <th>Product Details</th>
                            <th>Quantity</th>
                            <th>Prices</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <body>
                        <tr>
                            <td>
                                <img src="${prd.image}" alt="${prd.product_name}">
                                <div>
                                    <p>${prd.product_name}</p>
                                    <p>Discount: ${prd.discount}</p>
                                    <p>Shipping: ${prd.price}</p>
                                    <button type="button" class="btn btn-danger btn-sm">Cancel Cart</button>
                                </div>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger btn-sm" id="decrease">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
                                    </svg>
                                </button>
                                <input class="form-control" type="number" id="value-input" value="1">
                                <button type="button" class="btn btn-primary btn-sm" id="increase">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                    </svg>
                                </button>
                            </td>
                            <td>$ ${prd.price}</td>
                            <td id="total">$ ${prd.price}</td>
                        </tr>
                    </body>
                `;

                data.innerHTML = productHTML;

            } else {
                // console.error(`element is ${data}`);
            }
        }, 500);
    }

    quantityChange(price) {
        const waitPriceElement = setInterval(() => {
            const increase = document.getElementById("increase");
            const decrease = document.getElementById("decrease");
            const valueInput = document.getElementById("value-input");
            let number = 1;

            if (valueInput && increase) {
                clearInterval(waitPriceElement);
                increase.addEventListener('click', () => {
                    number++;
                    valueInput.value = number;

                    this.updateTotal(price, number);
                });
            }

            if (valueInput && decrease) {
                clearInterval(waitPriceElement);
                decrease.addEventListener('click', () => {
                    if (number <= 1) {
                        valueInput.value = 1;
                    } else {
                        number--;
                        valueInput.value = number;
                    }
                    this.updateTotal(price, number);
                });
            }
        }, 500);
    }

    removeProduct(productId) {

    }

    updateTotal(price, currentValue) {
        const setTotalElement = setInterval(() => {
            const total = document.getElementById("total");
            var t = 0;
            if(total){
                clearInterval(setTotalElement);

                t = price * currentValue;
                total.innerText = "$"+t;
            }
        }, 500);
    }

    shippingCardItem(index) {
        const waitElemet = setInterval(() => {
            const shipping = document.getElementById("items-count");

            if (shipping) {
                clearInterval(waitElemet);
                return shipping.innerText = `Shopping card ${index} ${index > 1 ? 'items' : 'item'}`;
            }
        });
    }
}


new ShoppingCardScript();
export default ShoppingCardScript;