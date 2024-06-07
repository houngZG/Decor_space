class Shipping{
    constructor(){
        this.init();
    }

    init(){

    }

    summaryData(production){
        const html = setInterval(() => {
            const shiing = document.getElementById("order-summary");
            var dataHtml = "";

            if(shiing){
                clearInterval(html);
                dataHtml = `
                    
                    <div class="summary-item">
                        <img src="${production.image}" alt="Black Chair">
                        <div class="item-details">
                            <p>${production.product_name}</p>
                            <p>$ ${production.price}.00</p>
                        </div>
                    </div>
                `;

                shiing.innerHTML = dataHtml;
            }

        });
    }

    getTotalValue(total){
        const html = setInterval(() => {
            const totalPrice = document.getElementById("total-price");
            if(totalPrice){
                clearInterval(html);

                return totalPrice.innerText = `$${total}.00`;
            }
        });
    }
}

new Shipping();
export default Shipping;