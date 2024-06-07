import ContentLoader from "./content_loader.js";
import Shipping from "./shipping.js";
class ShoppingCardScript {
    constructor() {
        this.init();
    }

    init() {
        this.deliveryMethod();
        this.removeProduct();
        this.checkOut("");
        this.loading = false;
    }

    readAndWriteCard(product) {
        this.loading = true;
        try {
            const prd = JSON.parse(product);
            console.log(prd.price);
            this.quantityChange(prd.price);
            this.checkOut(prd);
            const elementWaiting = setInterval(() => {
                const text = document.getElementById("data-available");
                const data = document.querySelector(".table");
                const totalMoney = document.getElementById("total-money");
                var productHTML = '';

                if (data) {
                    clearInterval(elementWaiting);

                    productHTML = `
                        <thead>
                            <tr>
                                <th colspan="2">Product Details</th>
                                <th>Quantity</th>
                                <th>Prices</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <body>
                            <tr>
                                <td>
                                    <img src="${prd.image}" alt="${prd.product_name}">
                                </td>
                                <th>
                                    <div>
                                        <p>${prd.product_name}</p>
                                        <p>Discount: ${prd.discount}</p>
                                        <p>Shipping: ${prd.price}</p>
                                        <button type="button" class="btn btn-danger btn-sm" id="cancel-card">Cancel Cart</button>
                                    </div>
                                </th>
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
                    text.innerText = "Data is available.";
                    totalMoney.innerText = `$ ${prd.price}.00`;
                    text.style.color = "black";

                } else {
                    // console.error(`element is ${data}`);
                }
            }, 500);

            this.loading = false;
        } catch (_) { }
    }

    quantityChange(price) {
        const waitPriceElement = setInterval(() => {
            const increase = document.getElementById("increase");
            const decrease = document.getElementById("decrease");
            const valueInput = document.getElementById("value-input");
            let number = 1;

            if (valueInput && increase) {
                clearInterval(waitPriceElement);

                increase.addEventListener('click', async () => {
                    number++;
                    valueInput.value = number;
                    await this.updateTotal(price, number);
                });
            }

            if (valueInput && decrease) {
                clearInterval(waitPriceElement);
                decrease.addEventListener('click', async () => {
                    if (number <= 1) {
                        valueInput.value = 1;
                        await this.updateTotal(price, number);
                    } else {
                        number--;
                        valueInput.value = number;
                        await this.updateTotal(price, number);
                    }
                });
            }

        }, 500);
    }

    removeProduct() {
        const html = setInterval(() => {
            const cancelProduct = document.getElementById("cancel-card");
            const data = document.querySelector(".table");
            const totalMoney = document.getElementById("total-money");
            const shipping = document.getElementById("items-count");
            const valueOfItem = document.getElementById("value-of-item");

            if (cancelProduct) {
                clearInterval(html);

                cancelProduct.addEventListener('click', () => {
                    data.innerHTML = "";
                    shipping.innerText = "0 item";
                    valueOfItem.innerText = "0 item";
                    totalMoney.innerText = "$0.00";

                });
            }
        });
    }

    updateTotal(price, currentValue) {
        const setTotalElement = setInterval(() => {
            const total = document.getElementById("total");
            const totalMoney = document.getElementById("total-money");
            const priceShipping = new Shipping();
            var t = 0;
            if (total && totalMoney) {
                clearInterval(setTotalElement);

                t = price * currentValue;
                total.innerText = "$" + t;
                totalMoney.innerText = `$ ${t === price ? price : t}.00`;
                priceShipping.getTotalValue(t);
            }
        }, 500);
    }

    shippingCardItem(index) {
        console.log(index);
        const waitElemet = setInterval(() => {
            const shipping = document.getElementById("items-count");
            const valueOfItem = document.getElementById("value-of-item");

            if (shipping) {
                clearInterval(waitElemet);
                shipping.innerText = `Shopping card ${index} ${index > 1 ? 'items' : 'item'}`;
                valueOfItem.innerText = `${index} ${index > 1 ? 'items' : 'item'}`;
            }
        });
    }

    checkOut(product) {
        const waitElement = setInterval(() => {
            const checkOut = document.getElementById('check-out');
            const contentLoader = new ContentLoader();
            const warning = document.getElementById("card");
            const mainWrpper = document.getElementById("main-wrpper");
            const loader = document.getElementById("loader");
            const cancel = document.getElementById("is-cancel");
            const url = './view/shipping.html';
            const scriptUrl = './scripts/shipping.js';
            const shiing = new Shipping();

            if (checkOut) {
                clearInterval(waitElement);
                checkOut.addEventListener('click', () => {
                    if (product !== "") {
                        loader.style.display = "block";
                        setTimeout(() => {
                            loader.style.display = "none";
                        }, 2000);
                        contentLoader.loadContent(url, scriptUrl);
                        shiing.summaryData(product);
                    } else {
                        mainWrpper.style.display = "block";
                        loader.style.display = "block";
                        setTimeout(() => {
                            loader.style.display = "none";
                            warning.style.display = "block";
                        }, 2000)
                    }
                });
            }

            if (cancel) {
                cancel.addEventListener('click', () => {
                    console.log(warning);
                    warning.style.display = "none";
                    mainWrpper.style.display = "none";
                });
            }
        }, 300);
    }

    deliveryMethod() {
        const html = setInterval(() => {
            const method = document.getElementById("delivery-method");
            const seletedValue = document.getElementById("selected-value");

            if (method && seletedValue) {
                clearInterval(html);

                method.addEventListener('change', function () {
                    var selected = this.value;
                    return seletedValue.innerText = selected;
                });
            }
        }, 300);
    }
}

new ShoppingCardScript();
export default ShoppingCardScript;