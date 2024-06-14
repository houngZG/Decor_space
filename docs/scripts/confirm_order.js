import { waitForElement } from "./app.js";

class ConfirmOrderScript{
    constructor(){
        this.init();
    }

    init(){}

    renderInvoice(pay_items){
        console.log(pay_items)
        waitForElement("#items", (element) => {
            var html = '';
            html = `<div class="item">
                <img
                src="${pay_items.image}"
                alt="${pay_items.product_name}"
                class="item-image"
                />
                <div class="item-details">
                    <p><strong>${pay_items.product_name}</strong></p>
                    <p>Quantities: 1</p>
                    <p>Color: ${pay_items.colors[1]}</p>
                </div>
                    <div class="item-price">
                    <p>$${pay_items.price}</p>
                </div>
            </div>`;
            element.innerHTML = html;
        });
    }

    getAddress(address){
        waitForElement("#address", (element) => {
            element.innerText = address;
        });
    }
}

new ConfirmOrderScript();
export default ConfirmOrderScript;