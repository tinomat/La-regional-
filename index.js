import productos from "./productos.js";

const productsDiv = document.querySelector(".products");
let currentItem = 40;
let content = "";
const generarProductos = (start, end) => {
    for (let i = start; i < end && i < productos.length; i++) {
        content += `<div class="product border-radius">
                        <div class="product-description-container">
                            <p class="product-description">
                                ${productos[i].name}
                            </p>
                            <p class= "product-description">
                                Id: ${productos[i].productId}
                            </p>    
                        </div>
                    </div>`;
    }
    productsDiv.innerHTML = content;
};

generarProductos(0, currentItem);

const loadMore = document.querySelector(".loadMore");
loadMore.addEventListener("click", (e) => {
    generarProductos(currentItem, currentItem + 40);
    currentItem += 40;
});

const inputSearch = document.getElementById("inputSearch");
document.querySelector(".send-search").addEventListener("click", () => {
    const search = inputSearch.value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    let content = "";
    productos.forEach((product) => {
        const nameProduct = product.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
        const idProduct = product.productId;
        if (nameProduct.includes(search) || idProduct.includes(search)) {
            content += `<div class="product border-radius">
                        <div class="product-description-container">
                            <p class="product-description">
                                ${product.name}
                            </p>
                            <p class= "product-description">
                                Id: ${product.productId}
                            </p>    
                        </div>
                    </div>`;
            loadMore.classList.add("hidden");
        }
    });
    if (content === "") {
        content = `<div class="product border-radius">
                        <div class="product-description-container">
                            <p class="product-description">
                                No se ha encontrado resultado para ${inputSearch.value}
                            </p>
                        </div>
                    </div>`;
    }
    if (search == "") {
        loadMore.classList.remove("hidden");
        productsDiv.innerHTML = "";
        content = "";
        for (let i = 0; i < 60; i++) {
            content += `<div class="product border-radius">
                        <div class="product-description-container">
                            <p class="product-description">
                                ${productos[i].name}
                            </p>
                            <p class= "product-description">
                                Id: ${productos[i].productId}
                            </p>    
                        </div>
                    </div>`;
        }
        productsDiv.innerHTML = content;
    }

    productsDiv.innerHTML = content;
});
const selectedContainer = document.querySelector(".selected-container");
const categoriesContainer = document.querySelector(".categories-container");
const dropdownIcon = document.querySelector(".dropdown-icon");
const categorieSelected = document.querySelector(".categorie-selected");
const categorieOptions = document.querySelectorAll(".categorie-option");
selectedContainer.addEventListener("click", () => {
    categoriesContainer.classList.toggle("categories-container-open");
    dropdownIcon.classList.toggle("dropdown-icon-open");
});
categorieOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
        loadMore.classList.add("hidden");
        categorieSelected.textContent = opt.textContent;
        categoriesContainer.classList.remove("categories-container-open");
        dropdownIcon.classList.remove("dropdown-icon-open");
        let content = "";
        productos.forEach((product) => {
            const selectedOption = categorieSelected.textContent
                .trim()
                .toLowerCase();
            if (selectedOption == product.category.trim().toLowerCase()) {
                content += `<div class="product border-radius">
                        <div class="product-description-container">
                            <p class="product-description">
                                ${product.name}
                            </p>
                            <p class= "product-description">
                                Id: ${product.productId}
                            </p>    
                        </div>
                    </div>`;
            }
            if (selectedOption == "todos") {
                content += `<div class="product border-radius">
                        <div class="product-description-container">
                            <p class="product-description">
                                ${product.name}
                            </p>
                            <p class= "product-description">
                                Id: ${product.productId}
                            </p>    
                        </div>
                    </div>`;
            }
            if (selectedOption == "oferta") {
                if (product.oferta) {
                    content += `<div class="product border-radius">
                        <div class="product-description-container">
                            <p class="product-description">
                                ${product.name}
                            </p>
                            <p class= "product-description">
                                Id: ${product.productId}
                            </p>    
                        </div>
                    </div>`;
                }
            }
            if (selectedOption == "promo") {
                if (product.promo) {
                    content += `<div class="product border-radius">
                        <div class="product-description-container">
                            <p class="product-description">
                                ${product.name}
                            </p>
                            <p class= "product-description">
                                Id: ${product.productId}
                            </p>    
                        </div>
                    </div>`;
                }
            }
        });
        if (content === "") {
            content = `<div class="product border-radius">
                           <div class="product-description-container">
                               <p class="product-description">
                                   No hay productos disponibles para la categoría seleccionada.
                               </p>
                           </div>
                       </div>`;
        }
        productsDiv.innerHTML = content;
    });
});
