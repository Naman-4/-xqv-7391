/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

    });


    /* CLOSE MOBILE MENU AFTER CLICK */

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

        });

    });

}


/* ================= MENU FILTER ================= */

const categoryButtons =
    document.querySelectorAll(".category");

const foodCards =
    document.querySelectorAll(".food-card");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const category =
            button.dataset.category;


        foodCards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* ================= SEARCH ================= */

const searchInput =
    document.getElementById("searchInput");


if (searchInput) {

    searchInput.addEventListener("input", () => {

        const searchValue =
            searchInput.value
                .toLowerCase()
                .trim();


        foodCards.forEach(card => {

            const foodName =
                card.querySelector("h3")
                    ?.textContent
                    .toLowerCase() || "";


            const foodDescription =
                card.querySelector("p")
                    ?.textContent
                    .toLowerCase() || "";


            if (
                foodName.includes(searchValue) ||
                foodDescription.includes(searchValue)
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}


/* ================= CART ================= */

let cart = [];


/* ================= ADD PRODUCT ================= */

function addToCart(name, price) {

    const existingItem =
        cart.find(item => item.name === name);


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    updateCart();


    alert(`${name} added to cart!`);

}


/* ================= UPDATE CART ================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartItems || !cartCount || !cartTotal) {
        return;
    }


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">

                Your cart is empty.

            </p>

        `;

    }


    let total = 0;

    let totalQuantity = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;

        totalQuantity += item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div>

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

            </div>


            <div class="cart-controls">

                <button
                    onclick="decreaseQuantity(${index})">

                    −

                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    onclick="increaseQuantity(${index})">

                    +

                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        `₹${total}`;

}


/* ================= INCREASE ================= */

function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity++;


    updateCart();

}


/* ================= DECREASE ================= */

function decreaseQuantity(index) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity--;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* ================= OPEN CART ================= */

function openCart() {

    document
        .getElementById("cartOverlay")
        ?.classList.add("show");

}


/* ================= CLOSE CART ================= */

function closeCart() {

    document
        .getElementById("cartOverlay")
        ?.classList.remove("show");

}


/* ================= CLOSE CART OUTSIDE ================= */

const cartOverlay =
    document.getElementById("cartOverlay");


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        function(event) {

            if (event.target === this) {

                closeCart();

            }

        }
    );

}


/* ================= WHATSAPP ORDER ================= */

function orderOnWhatsApp() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    /*
     * WebDukaan demo WhatsApp number
     * +91 98350 54271
     */

    const phoneNumber =
        "919835054271";


    let message =
        "Hello Spice Haven! 🍽️\n\n";


    message +=
        "*New Order*\n\n";


    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        message +=
            `${item.name} × ${item.quantity} = ₹${itemTotal}\n`;

    });


    message +=
        `\n*Total: ₹${total}*\n\n`;


    message +=
        "Please confirm my order. Thank you! 😊";


    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById("name")
                    ?.value || "there";


            alert(
                `Thank you ${name}! Your message has been received.`
            );


            contactForm.reset();

        }
    );

}


/* ================= INITIAL CART ================= */

updateCart();