import { waitForElement } from "./app.js";
import ConfirmOrderScript from "./confirm_order.js";
import ContentLoader from "./content_loader.js";
class Shipping {
    constructor() {
        this.shipping = '';
        this.s = '';
        this.init();
    }

    init() {
        
    }

    summaryData(production) {
        this.paymentMethod(production);
        waitForElement('#order-summary', (element) => {
            var dataHtml = "";
            dataHtml = `
                <div class="summary-item">
                    <img src="${production.image}" alt="Black Chair">
                    <div class="item-details">
                        <p>${production.product_name}</p>
                        <p>$ ${production.price}.00</p>
                        <p>Shipping: ${this.shipping}</p>
                    </div>
                </div>
            `;
            this.shippingPrice(this.shipping);
            return element.innerHTML = dataHtml;
        });
    }

    getTotalValue(total) {
        waitForElement('#total-price', async (element) => {
            let t;
            if (this.s !== null && this.s !== undefined) {
                t = total + this.s;
            } else {
                t = total;
            }
            element.innerText = t + ".00";

            console.log("this.s " + this.s);
        });
    }

    shppingMethod(shipping) {
        console.log(shipping);
        this.shipping = shipping;
    }

    shippingPrice(shipping) {
        var shippingPrice = [0, 10, 5, 3, 2, 50];
        let getShipping;
        if (shipping === "Standard Delivery(motor) - Free") {
            getShipping = shippingPrice[0];
        } else if (shipping === "Air plane - 10$") {
            getShipping = shippingPrice[1];
        } else if (shipping === "Ship - 5$") {
            getShipping = shippingPrice[2];
        } else if (shipping === "Bus - 3$") {
            getShipping = shippingPrice[3];
        } else if (shipping === "Taxi - 2$") {
            getShipping = shippingPrice[4];
        } else if (shipping === "Lambogini - 50$") {
            getShipping = shippingPrice[5];
        }

        console.log("shipping " + shipping);
        console.log("getShipping " + getShipping);

        waitForElement("#shipping", (element) => {
            element.innerText = "$" + getShipping + ".00";
        });

        this.s = getShipping;
        console.log("this.s " + this.s);
    }

    paymentMethod(data) {
        waitForElement('#pay-btn', (element) => {
            const firstName = document.getElementById("first-name");
            const lastName = document.getElementById("last-name");
            const address = document.getElementById("address");
            const city = document.getElementById("city");
            const postalCode = document.getElementById("postal-code");
            const phoneNumber = document.getElementById("phone-number");
            const errMsg = document.getElementById("error-message");
            const main = document.getElementById("main");
            const notifications = document.getElementById("notifications");
            let valid = true;

            try {
                element.addEventListener('click', () => {
                    if (firstName.value === "") {
                        errMsg.style.display = 'block';
                        valid = false;
                    }

                    if (lastName.value === "") {
                        errMsg.style.display = 'block';
                        valid = false;
                    }

                    if (address.value === "") {
                        errMsg.style.display = 'block';
                        valid = false;
                    }

                    if (city.value === "") {
                        errMsg.style.display = 'block';
                        valid = false;
                    }

                    if (postalCode.value === "") {
                        errMsg.style.display = 'block';
                        valid = false;
                    }

                    if (phoneNumber.value === "") {
                        errMsg.style.display = 'block';
                        valid = false;
                    }

                    if (valid === false) {
                        setTimeout(() => {
                            errMsg.style.display = 'none';
                        }, 3000);
                    } else {
                        const l = new ContentLoader();
                        const url = './view/confirm_order.html';
                        const scriptUrl = './scripts/confirm_order.js';
                        const d = new ConfirmOrderScript();
                        var addressValue = address.value;
                        d.getAddress(addressValue);
                        console.log("addressValue " + addressValue);

                        d.renderInvoice(data);
                        l.loadContent(url, scriptUrl);
                        
                    }

                    return;
                });
            } catch (_) { }
        });
    }
}

new Shipping();
export default Shipping;