function applyPromo() {
    var inputField = document.getElementById("promoInput");
    var promoCode = inputField.value.trim();

    var validCodes = ["abc123", "def456", "ghi789", "ghi784", "houngvip"];
    var isValid = validCodes.includes(promoCode);

    var tickIcon = document.querySelector(".promo-code-input .fa-check");
    var crossIcon = document.querySelector(".promo-code-input .fa-times");
    var message = document.querySelector(".promoMessage");
    var total = document.querySelector(".total");
    if (isValid) {
        tickIcon.style.display = "inline";
        crossIcon.style.display = "none";

        if(promoCode === '' || !isValid){
            message.textContent = "Sorry, This code is not available for now!";
        } else {
            if (promoCode === "houngvip") {
                message.textContent = "Offer: 75%";
                total.textContent = "102 $"
            } else if (promoCode === "abc123") {
                message.textContent = "Offer: 50%";
                total.textContent = "204 $"
            } else if (promoCode === "def456") {
                message.textContent = "Offer: 25%";
                total.textContent = "306 $"
            } else if (promoCode === "ghi789") {
                message.textContent = "Offer: 10%";
                total.textContent = "367.2 $"
            } else {
                message.textContent = "Sorry, This code is not available for now!";
            }
        }

    } else {
        tickIcon.style.display = "none";
        crossIcon.style.display = "inline";
        message.textContent = "";
    }

    if (promoCode === "" && !isValid) {
        promoCode = generateRandomCode();
    } else {
        promoCode = inputField.value = '';
    }

    inputField.value = promoCode;
}


function generateRandomCode() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var length = 6;
    var randomCode = '';

    for (var i = 0; i < length; i++) {
        randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomCode;
}

document.addEventListener("DOMContentLoaded", function() {
    const increaseButton = document.getElementById('increase');
    const decreaseButton = document.getElementById('decrease');
    const quantityInput = document.getElementById('quantity');

    increaseButton.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    decreaseButton.addEventListener('click', () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });
});