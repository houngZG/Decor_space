import { waitForElement } from "./app.js";
import ProductDetailScript from "./product_details.js";

class ContentLoader {
    constructor() {
        this.json = "./data.json";
        this.lengthData = 0;
        this.startItem = 0;
        this.endItem = 8;
    }

    loadContent(url, scriptUrl) {
        waitForElement("#content", (contentContainer) => {
            if (contentContainer) {

                fetch(url)
                    .then(response => response.text())
                    .then(data => {
                        contentContainer.innerHTML = data;
                        if (scriptUrl) {
                            this.loadScript(scriptUrl, () => {
                                if (url.includes('furniture.html')) {
                                    this.fetchData();
                                    this.clickTile();
                                    this.clickPage();
                                }
                            });
                        }
                        this.attachMoreTextListener();
                    })
                    .catch(error => console.error('Error fetching content:', error));
            }
        });
    }

    loadScript(scriptUrl, callback) {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.type = 'module';
        script.onload = callback;
        script.onerror = () => console.error(`Error loading script: ${scriptUrl}`);
        document.head.appendChild(script);
    }

    fetchData(start = 0, end = 8) {
        fetch(this.json)
            .then(response => response.json())
            .then(datas => {
                const furnituresHTML = document.querySelector(".parent-card");
                const d = new ProductDetailScript();
                if (!furnituresHTML) {
                    console.error('Error: .parent-card element not found');
                    return;
                }

                let getData = "";
                const l = datas.data.furnitures;
                const collection = datas.data.our_collects;
                this.lengthData = l.length;
                this.getNewCollection(l);
                d.relatedProduct(l, "furnitures");
                this.ourConllect(collection);

                if (this.startItem < 0) {
                    this.startItem = 0;
                    end = 8;
                }

                if (end >= this.lengthData) {
                    end = this.lengthData;
                }

                l.slice(start, end).forEach(item => {
                    getData += `
                        <div class="card product-card" id="card-product-furnitures-${item.id}">
                            <img class="card-img-top" src="${item.image}" alt="${item.product_name}" />
                            <div class="card-text name-card text-start p-1 p-sm-1 p-md-2 p-lg-3 p-xl-3 p-xxl-3">
                                <ul class="list">
                                    <li class="title">${item.product_name}</li>
                                    <li>Product order list: 00${item.id}</li>
                                    <li>Rating: ${this.generateStars(item.rating)}</li>
                                    <li>Price: ${item.price}</li>
                                    <li>Discount: ${item.discount}</li>
                                </ul>
                            </div>
                        </div>
                    `;
                });
                furnituresHTML.innerHTML = getData;

                //load data into products screen
                this.loadProductDetail(l, start, end, 0, "furnitures");

            })
            .catch(error => console.error("Error fetching data:", error));
    }

    getNewCollection(data) {
        waitForElement("#new-arrival", (element) => {
            if (!Array.isArray(data)) {
                console.error('Data is not an array:', data);
                return;
            }

            let lastTwoItems = data.slice(-2);
            var html = '';
            lastTwoItems.forEach(items => {
                html += `
                    <div class="card me-lg-5 me-1 card-arrive-product">
                        <img src="${items.image}" alt="${items.product_name}" />
                        <div class="arrive-product">
                            <p class="quote-card">
                                Product Just Arrived. <br />
                                Have in stock
                            </p>
                            <div class="wraper-text" id="card-product-furnitures-${items.id}">
                                <p>New Arrived</p>
                            </div>
                        </div>
                    </div>
                `;
            });
            this.loadProductDetail(lastTwoItems, 0, 0, 0, "furnitures");
            element.innerHTML = html;
        });
    }

    ourConllect(collects){
        waitForElement("#collects", (element) => {
            let html = '';

            collects.slice(0, 8).forEach(item => {
                html += `
                    <div class="col-6 col-md-3 child-image" id="card-product-our_collects-${item.id}">
                        <img src="${item.image}" alt="${item.product_name}">
                    </div>
                `;
            });
            this.loadProductDetail(collects, 0, 0, 0, "our_collects");
            element.innerHTML = html;
        });
    }



    clickTile() {
        const tiles = document.querySelectorAll('.txt');
        tiles.forEach(tile => {
            tile.addEventListener('click', function () {
                console.log('Tile clicked:', this);
            });
        });
    }

    loadProductDetail(products, start, end, isInFile, type) {
        if (start === 0 && end !== 0 && isInFile === 0) {
            products.slice(start, end).forEach(item => {
                waitForElement("#card-product-"+ type + "-"+ item.id, (cardProduct) => {
                    cardProduct.addEventListener('click', function (event) {
                        event.preventDefault();
                        const url = './view/product_details.html';
                        const script = './scripts/product_details.js';
                        const json = JSON.stringify(item);
                        const data = new ProductDetailScript();
                        data.renderProductDetails(json);
                        this.loadContent(url, script);
                    }.bind(this));
                });
            });

            return;
        }

        if (start === 0 && end === 0 && isInFile === 0) {
            products.forEach(item => {
                waitForElement("#card-product-" + type + "-" + item.id, (cardProduct) => {
                    cardProduct.addEventListener('click', function (event) {
                        event.preventDefault();
                        const url = './view/product_details.html';
                        const script = './scripts/product_details.js';
                        const json = JSON.stringify(item);
                        const data = new ProductDetailScript();
                        data.renderProductDetails(json);
                        this.loadContent(url, script);
                    }.bind(this));
                });
            });

            return;
        }

        if (start === 0 && end === 0 && isInFile === 1) {
            products.forEach(item => {
                waitForElement("#card-product-" + type + "-" + item.id, (cardProduct) => {
                    cardProduct.addEventListener('click', function (event) {
                        event.preventDefault();
                        const json = JSON.stringify(item);
                        const data = new ProductDetailScript();
                        data.renderProductDetails(json);
                    }.bind(this));
                });
            });

            return;
        }
    }

    generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="${i <= rating ? 'star-active' : 'star-unactive'} bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>`;
        }
        return stars;
    }

    clickPage() {
        const plusPagination = document.getElementById('plus-pagination');
        const minusPagination = document.getElementById('minus-pagination');
        if (plusPagination) {
            plusPagination.addEventListener('click', () => {
                this.doPagination(true);
            });
        } else {
            console.error('Element plusPagination not found');
        }

        if (minusPagination) {
            minusPagination.addEventListener('click', () => {
                this.doPagination(false);
            });
        } else {
            console.error('Element minusPagination not found');
        }
    }

    doPagination(isPlus = false) {
        console.log(isPlus);
        if (isPlus === true) {
            if (this.endItem >= this.lengthData) {
                return console.log("invalid value for plus");
            } else {
                this.startItem += 8;
                this.endItem += 8;
            }
        } else {
            if (this.startItem <= 0) {
                return console.log("invalid value for minus");
            } else {
                this.startItem -= 8;
                this.endItem -= 8;
            }
        }
        this.fetchData(this.startItem, this.endItem);
    }

    attachMoreTextListener() {
        const moreButton = document.getElementById("more-button");
        if (moreButton) {
            moreButton.addEventListener('click', this.toggleMoreText);
        }
    }

    toggleMoreText() {
        const moreText = document.getElementById("more-text");
        const buttonText = document.getElementById("more-button");

        if (moreText.style.display === "none" || moreText.style.display === "") {
            moreText.style.display = "block";
            buttonText.textContent = "See Less";
        } else {
            moreText.style.display = "none";
            buttonText.textContent = "See More";
        }
    }
}

new ContentLoader();
export default ContentLoader;


