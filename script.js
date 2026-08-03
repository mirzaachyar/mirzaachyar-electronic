/* =====================================================
PRODUCT DATA
===================================================== */

const products = [
{
id: 1,
name: "AC Daikin Inverter 1 PK",
brand: "DAIKIN",
category: "AC",
price: 4500000,
image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600"
},
{
id: 2,
name: 'Samsung Smart TV 43" 4K',
brand: "SAMSUNG",
category: "TV",
price: 5200000,
image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600"
},
{
id: 3,
name: "LG Kulkas 2 Pintu Inverter",
brand: "LG",
category: "Kulkas",
price: 6300000,
image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600"
},
{
id: 4,
name: "Sharp Mesin Cuci 8 Kg",
brand: "SHARP",
category: "Mesin Cuci",
price: 3800000,
image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600"
},
{
id: 5,
name: 'Miyako Kipas Angin 16"',
brand: "MIYAKO",
category: "Kipas",
price: 450000,
image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600"
},
{
id: 6,
name: "Philips Blender Series 5000",
brand: "PHILIPS",
category: "Dapur",
price: 650000,
image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600"
}
];

/* =====================================================
VARIABLES
===================================================== */

let cart = JSON.parse(
localStorage.getItem("mirzaCart")
) || [];

let wishlist = JSON.parse(
localStorage.getItem("mirzaWishlist")
) || [];

let currentModalProduct = null;

let modalQuantity = 1;

/* =====================================================
FORMAT RUPIAH
===================================================== */

function formatRupiah(number) {

```
return new Intl.NumberFormat(
    "id-ID",
    {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }
).format(number);
```

}

/* =====================================================
TOAST
===================================================== */

function showToast(message) {

```
const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

toastMessage.textContent = message;

toast.classList.add("show");

setTimeout(() => {

    toast.classList.remove("show");

}, 2500);
```

}

/* =====================================================
HERO SLIDER
===================================================== */

const heroSlides =
document.querySelectorAll(".hero-slide");

const heroDots =
document.querySelectorAll(".hero-dot");

let currentSlide = 0;

function showSlide(index) {

```
heroSlides.forEach(
    slide => slide.classList.remove("active")
);

heroDots.forEach(
    dot => dot.classList.remove("active")
);

heroSlides[index].classList.add("active");

heroDots[index].classList.add("active");

currentSlide = index;
```

}

document
.getElementById("heroNext")
.addEventListener("click", () => {

```
    let next =
        (currentSlide + 1) % heroSlides.length;

    showSlide(next);

});
```

document
.getElementById("heroPrev")
.addEventListener("click", () => {

```
    let previous =
        (currentSlide - 1 + heroSlides.length)
        % heroSlides.length;

    showSlide(previous);

});
```

heroDots.forEach((dot, index) => {

```
dot.addEventListener(
    "click",
    () => showSlide(index)
);
```

});

setInterval(() => {

```
let next =
    (currentSlide + 1) % heroSlides.length;

showSlide(next);
```

}, 5000);

/* =====================================================
CATEGORY DROPDOWN
===================================================== */

const categoryButton =
document.getElementById("categoryMenuButton");

const categoryDropdown =
document.getElementById("categoryDropdown");

categoryButton.addEventListener(
"click",
() => {

```
    categoryDropdown.classList.toggle("show");

}
```

);

document.addEventListener(
"click",
event => {

```
    if (
        !event.target.closest(".category-menu")
    ) {

        categoryDropdown.classList.remove("show");

    }

}
```

);

/* =====================================================
FILTER PRODUCT
===================================================== */

function filterProducts(
search = "",
category = "all"
) {

```
const cards =
    document.querySelectorAll(".product-card");

let visible = 0;

cards.forEach(card => {

    const name =
        card.dataset.name.toLowerCase();

    const cardCategory =
        card.dataset.category;

    const searchMatch =
        name.includes(search.toLowerCase());

    const categoryMatch =
        category === "all" ||
        cardCategory === category;

    if (
        searchMatch &&
        categoryMatch
    ) {

        card.style.display = "";

        visible++;

    } else {

        card.style.display = "none";

    }

});


const noProduct =
    document.getElementById("noProduct");

if (visible === 0) {

    noProduct.classList.add("show");

} else {

    noProduct.classList.remove("show");

}


document
    .getElementById("productResultText")
    .textContent =
    `${visible} produk ditemukan`;
```

}

/* =====================================================
SEARCH
===================================================== */

const searchInput =
document.getElementById("searchInput");

const searchCategory =
document.getElementById("searchCategory");

function performSearch() {

```
filterProducts(
    searchInput.value,
    searchCategory.value
);

document
    .getElementById("produk")
    .scrollIntoView({
        behavior: "smooth"
    });
```

}

document
.getElementById("searchButton")
.addEventListener(
"click",
performSearch
);

searchInput.addEventListener(
"keyup",
event => {

```
    if (event.key === "Enter") {

        performSearch();

    }

}
```

);

searchInput.addEventListener(
"input",
() => {

```
    filterProducts(
        searchInput.value,
        searchCategory.value
    );

}
```

);

searchCategory.addEventListener(
"change",
() => {

```
    filterProducts(
        searchInput.value,
        searchCategory.value
    );

}
```

);

/* =====================================================
CATEGORY BUTTONS
===================================================== */

document
.querySelectorAll(
".category-card, .category-dropdown a"
)
.forEach(element => {

```
    element.addEventListener(
        "click",
        event => {

            event.preventDefault();

            const category =
                element.dataset.category;

            filterProducts(
                "",
                category
            );

            document
                .getElementById("searchInput")
                .value = "";

            document
                .getElementById("searchCategory")
                .value =
                category === "all"
                    ? "all"
                    : category;

            document
                .getElementById("produk")
                .scrollIntoView({
                    behavior: "smooth"
                });

            categoryDropdown
                .classList
                .remove("show");

        }
    );

});
```

/* =====================================================
SORT PRODUCTS
===================================================== */

document
.getElementById("sortProducts")
.addEventListener(
"change",
function () {

```
        const grid =
            document.getElementById("productGrid");

        const cards =
            Array.from(
                grid.querySelectorAll(".product-card")
            );

        const value = this.value;

        if (value === "low") {

            cards.sort(
                (a, b) =>
                    Number(a.dataset.price) -
                    Number(b.dataset.price)
            );

        }

        if (value === "high") {

            cards.sort(
                (a, b) =>
                    Number(b.dataset.price) -
                    Number(a.dataset.price)
            );

        }

        if (value === "name") {

            cards.sort(
                (a, b) =>
                    a.dataset.name
                        .localeCompare(
                            b.dataset.name
                        )
            );

        }

        cards.forEach(
            card => grid.appendChild(card)
        );

    }
);
```

/* =====================================================
WISHLIST
===================================================== */

function updateWishlistCount() {

```
document
    .getElementById("wishlistCount")
    .textContent =
    wishlist.length;
```

}

function saveWishlist() {

```
localStorage.setItem(
    "mirzaWishlist",
    JSON.stringify(wishlist)
);
```

}

document
.querySelectorAll(".wishlist-btn")
.forEach(button => {

```
    button.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            const card =
                button.closest(".product-card");

            const id =
                Number(card.dataset.id);

            const index =
                wishlist.indexOf(id);

            if (index === -1) {

                wishlist.push(id);

                button.classList.add("active");

                button.innerHTML =
                    '<i class="fa-solid fa-heart"></i>';

                showToast(
                    "Produk ditambahkan ke wishlist."
                );

            } else {

                wishlist.splice(index, 1);

                button.classList.remove("active");

                button.innerHTML =
                    '<i class="fa-regular fa-heart"></i>';

                showToast(
                    "Produk dihapus dari wishlist."
                );

            }

            saveWishlist();

            updateWishlistCount();

        }
    );

});
```

function restoreWishlist() {

```
document
    .querySelectorAll(".product-card")
    .forEach(card => {

        const id =
            Number(card.dataset.id);

        if (wishlist.includes(id)) {

            const button =
                card.querySelector(
                    ".wishlist-btn"
                );

            button.classList.add("active");

            button.innerHTML =
                '<i class="fa-solid fa-heart"></i>';

        }

    });
```

}

restoreWishlist();

updateWishlistCount();

/* =====================================================
CART
===================================================== */

function saveCart() {

```
localStorage.setItem(
    "mirzaCart",
    JSON.stringify(cart)
);
```

}

function updateCartCount() {

```
const count =
    cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

document
    .getElementById("cartCount")
    .textContent =
    count;
```

}

function addToCart(
id,
quantity = 1
) {

```
const product =
    products.find(
        item => item.id === id
    );

if (!product) return;


const existing =
    cart.find(
        item => item.id === id
    );


if (existing) {

    existing.quantity += quantity;

} else {

    cart.push({
        ...product,
        quantity: quantity
    });

}


saveCart();

updateCartCount();

renderCart();

showToast(
    `${product.name} ditambahkan ke keranjang.`
);
```

}

/* =====================================================
PRODUCT ADD CART BUTTON
===================================================== */

document
.querySelectorAll(".add-cart-btn")
.forEach(button => {

```
    button.addEventListener(
        "click",
        () => {

            const card =
                button.closest(".product-card");

            const id =
                Number(card.dataset.id);

            addToCart(id);

        }
    );

});
```

/* =====================================================
CART RENDER
===================================================== */

function renderCart() {

```
const container =
    document.getElementById("cartItems");

const totalElement =
    document.getElementById("cartTotal");


if (cart.length === 0) {

    container.innerHTML = `

        <div class="empty-cart">

            <i class="fa-solid fa-cart-shopping"></i>

            <h4>
                Keranjang masih kosong
            </h4>

            <p>
                Tambahkan produk untuk mulai berbelanja.
            </p>

        </div>

    `;

    totalElement.textContent =
        formatRupiah(0);

    return;

}


container.innerHTML = "";

let total = 0;


cart.forEach(item => {

    total +=
        item.price *
        item.quantity;


    const div =
        document.createElement("div");

    div.className =
        "cart-item";


    div.innerHTML = `

        <img
            src="${item.image}"
            alt="${item.name}">

        <div class="cart-item-info">

            <h5>
                ${item.name}
            </h5>

            <strong>
                ${formatRupiah(item.price)}
            </strong>

            <div class="cart-quantity">

                <button
                    data-action="minus"
                    data-id="${item.id}">
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    data-action="plus"
                    data-id="${item.id}">
                    +
                </button>

            </div>

        </div>

        <button
            class="remove-cart"
            data-action="remove"
            data-id="${item.id}">

            <i class="fa-solid fa-trash"></i>

        </button>

    `;


    container.appendChild(div);

});


totalElement.textContent =
    formatRupiah(total);


container
    .querySelectorAll(
        "[data-action]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    Number(
                        button.dataset.id
                    );

                const action =
                    button.dataset.action;


                const item =
                    cart.find(
                        item =>
                            item.id === id
                    );

                if (!item) return;


                if (
                    action === "plus"
                ) {

                    item.quantity++;

                }


                if (
                    action === "minus"
                ) {

                    item.quantity--;

                    if (
                        item.quantity <= 0
                    ) {

                        cart =
                            cart.filter(
                                item =>
                                    item.id !== id
                            );

                    }

                }


                if (
                    action === "remove"
                ) {

                    cart =
                        cart.filter(
                            item =>
                                item.id !== id
                        );

                }


                saveCart();

                updateCartCount();

                renderCart();

            }
        );

    });
```

}

/* =====================================================
CART BUTTON
===================================================== */

document
.getElementById("cartButton")
.addEventListener(
"click",
() => {

```
        renderCart();

        const cartCanvas =
            new bootstrap.Offcanvas(
                document.getElementById(
                    "cartCanvas"
                )
            );

        cartCanvas.show();

    }
);
```

/* =====================================================
WISHLIST BUTTON
===================================================== */

document
.getElementById("wishlistButton")
.addEventListener(
"click",
() => {

```
        showToast(
            `Wishlist berisi ${wishlist.length} produk.`
        );

    }
);
```

/* =====================================================
QUICK VIEW
===================================================== */

document
.querySelectorAll(".quick-view-btn")
.forEach(button => {

```
    button.addEventListener(
        "click",
        () => {

            const card =
                button.closest(".product-card");

            const id =
                Number(card.dataset.id);

            const product =
                products.find(
                    item => item.id === id
                );

            if (!product) return;


            currentModalProduct =
                product;

            modalQuantity = 1;


            document
                .getElementById(
                    "modalProductImage"
                )
                .src =
                product.image;


            document
                .getElementById(
                    "modalProductBrand"
                )
                .textContent =
                product.brand;


            document
                .getElementById(
                    "modalProductName"
                )
                .textContent =
                product.name;


            document
                .getElementById(
                    "modalProductPrice"
                )
                .textContent =
                formatRupiah(
                    product.price
                );


            document
                .getElementById(
                    "modalQuantity"
                )
                .textContent =
                modalQuantity;


            const modal =
                new bootstrap.Modal(
                    document.getElementById(
                        "quickViewModal"
                    )
                );

            modal.show();

        }
    );

});
```

/* =====================================================
MODAL QUANTITY
===================================================== */

document
.getElementById("modalMinus")
.addEventListener(
"click",
() => {

```
        if (modalQuantity > 1) {

            modalQuantity--;

        }

        document
            .getElementById(
                "modalQuantity"
            )
            .textContent =
            modalQuantity;

    }
);
```

document
.getElementById("modalPlus")
.addEventListener(
"click",
() => {

```
        modalQuantity++;

        document
            .getElementById(
                "modalQuantity"
            )
            .textContent =
            modalQuantity;

    }
);
```

document
.getElementById("modalAddCart")
.addEventListener(
"click",
() => {

```
        if (!currentModalProduct)
            return;

        addToCart(
            currentModalProduct.id,
            modalQuantity
        );


        const modalElement =
            document.getElementById(
                "quickViewModal"
            );

        const modal =
            bootstrap.Modal.getInstance(
                modalElement
            );

        modal.hide();

    }
);
```

/* =====================================================
CHECKOUT WHATSAPP
===================================================== */

document
.getElementById("checkoutButton")
.addEventListener(
"click",
() => {

```
        if (cart.length === 0) {

            showToast(
                "Keranjang masih kosong."
            );

            return;

        }


        let message =
            "Halo Mirza Electronic,%0A%0A";

        message +=
            "Saya ingin melakukan pemesanan:%0A%0A";


        let total = 0;


        cart.forEach(
            (item, index) => {

                const subtotal =
                    item.price *
                    item.quantity;

                total += subtotal;


                message +=
                    `${index + 1}. ${item.name}%0A`;

                message +=
                    `   Qty: ${item.quantity}%0A`;

                message +=
                    `   Harga: ${formatRupiah(
                        subtotal
                    )}%0A%0A`;

            }
        );


        message +=
            `Total: ${formatRupiah(total)}%0A%0A`;

        message +=
            "Nama:%0A";

        message +=
            "Alamat:%0A";


        const phone =
            "6281234567890";


        window.open(
            `https://wa.me/${phone}?text=${message}`,
            "_blank"
        );

    }
);
```

/* =====================================================
LOAD MORE
===================================================== */

document
.getElementById("loadMore")
.addEventListener(
"click",
() => {

```
        showToast(
            "Catalog lengkap akan tersedia setelah database produk terhubung."
        );

    }
);
```

/* =====================================================
BACK TO TOP
===================================================== */

const backToTop =
document.getElementById(
"backToTop"
);

window.addEventListener(
"scroll",
() => {

```
    if (
        window.scrollY > 500
    ) {

        backToTop.classList.add(
            "show"
        );

    } else {

        backToTop.classList.remove(
            "show"
        );

    }

}
```

);

backToTop.addEventListener(
"click",
() => {

```
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
```

);

/* =====================================================
INITIALIZE
===================================================== */

updateCartCount();

updateWishlistCount();

renderCart();

filterProducts();
