import { waitForElement } from "./app.js";
import ContentLoader from "./content_loader.js";
import ProductDetailScript from "./product_details.js";
class DesignInspirationScript {
    constructor() {
        this.init();
    }

    init() {
        this.dynamicContent();
    }

    listDownProduct(content) {
        waitForElement("#dynamic-categories", (objectOffice) => {
            fetch("./data.json")
                .then(res => res.json())
                .then(datas => {
                    let d = datas.data[content];
                    console.log(content)
                    var html = "";
                    const contentLoader = new ContentLoader();
                    const p = new ProductDetailScript();
                    p.relatedProduct(d, content);

                    d.forEach(element => {
                        html += `
                            <div class="product" id="card-product-${content}-${element.id}">
                                <img src="${element.image}" alt="${element.product_name}" />
                                <div class="about-product mt-2 mt-lg-2 mt-sm-2 mt-xl-2 mt-xxl-2">
                                    <h6 class="name-product">${element.product_name}</h6>
                                    <p class="descrition-product">${element.description}</p>
                                    <p class="price">$${element.price}</p>
                                </div>
                            </div>
                        `;
                    });

                    contentLoader.loadProductDetail(d, 0, 0, 0, content);
                    objectOffice.innerHTML = html;
                });
        });
    }
    
    dynamicContent() {
        console.log('dynamicContent')
        waitForElement(["#offices", "#kitchens", "#livingrooms"], (office, kitchen, livingroom) => {
            var object = 'offices';
            this.listDownProduct(object);
            this.activateMenuItem(object, "offices")
    
            if (office) {
                office.addEventListener('click', () => {
                    console.log('true')
                    object = 'offices';
                    this.listDownProduct(object);
                    this.activateMenuItem(object, "offices");
                });
            }

            if (kitchen) {
                kitchen.addEventListener('click', () => {
                    object = 'kitchens';
                    this.listDownProduct(object);
                    this.activateMenuItem(object, "kitchens")
                });
            }

            if (livingroom) {
                livingroom.addEventListener('click', () => {
                    object = 'livingrooms';
                    this.listDownProduct(object);
                    this.activateMenuItem(object, "livingrooms")
                });
            }
        });
    }

    activateMenuItem(element, objectName) {
        if (!element) {
            console.error('Element is null or undefined:', element);
            return;
        }
        document.querySelectorAll('.menu li').forEach(item => item.classList.remove('active'));
        document.getElementById(element).classList.add('active');
        this.listDownProduct(objectName);
    }
}

new DesignInspirationScript();
export default DesignInspirationScript;