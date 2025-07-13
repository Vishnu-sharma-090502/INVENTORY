const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const cartList = document.getElementById("cartList");

let products = JSON.parse(localStorage.getItem("kitchenInventory")) || [];
let cart = JSON.parse(localStorage.getItem("kitchenCart")) || [];

function saveProducts() {
  localStorage.setItem("kitchenInventory", JSON.stringify(products));
}

function saveCart() {
  localStorage.setItem("kitchenCart", JSON.stringify(cart));
}

function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const imgEl = document.createElement("img");
    imgEl.src = product.image ? product.image : "https://via.placeholder.com/150";
    imgEl.alt = product.name;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const typeP = document.createElement("p");
    typeP.textContent = `Type: ${product.type}`;

    const quantityP = document.createElement("p");
    quantityP.textContent = `Quantity: ${product.quantity}`;

    const addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.className = "qty-btn";
    addBtn.addEventListener("click", () => {
      product.quantity++;
      quantityP.textContent = `Quantity: ${product.quantity}`;
      saveProducts();
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "−";
    removeBtn.className = "qty-btn";
    removeBtn.addEventListener("click", () => {
      if (product.quantity > 0) {
        product.quantity--;
        quantityP.textContent = `Quantity: ${product.quantity}`;
        saveProducts();
      }
    });

    const cartBtn = document.createElement("button");
    cartBtn.textContent = "Add to Cart 🛒";
    cartBtn.className = "cart-btn";
    cartBtn.addEventListener("click", () => {
      cart.push(product);
      products.splice(index, 1);
      saveProducts();
      saveCart();
      renderProducts();
      renderCart();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      products.splice(index, 1);
      saveProducts();
      renderProducts();
    });

    card.appendChild(imgEl);
    card.appendChild(title);
    card.appendChild(typeP);
    card.appendChild(quantityP);
    card.appendChild(addBtn);
    card.appendChild(removeBtn);
    card.appendChild(cartBtn);
    card.appendChild(deleteBtn);

    productList.appendChild(card);
  });
}

function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const imgEl = document.createElement("img");
    imgEl.src = item.image ? item.image : "https://via.placeholder.com/150";
    imgEl.alt = item.name;

    const title = document.createElement("h3");
    title.textContent = item.name;

    const typeP = document.createElement("p");
    typeP.textContent = `Type: ${item.type}`;

    const quantityP = document.createElement("p");
    quantityP.textContent = `Quantity: ${item.quantity}`;

    const removeFromCartBtn = document.createElement("button");
    removeFromCartBtn.textContent = "Remove from Cart";
    removeFromCartBtn.className = "delete-btn";
    removeFromCartBtn.addEventListener("click", () => {
      products.push(item);
      cart.splice(index, 1);
      saveProducts();
      saveCart();
      renderProducts();
      renderCart();
    });

    card.appendChild(imgEl);
    card.appendChild(title);
    card.appendChild(typeP);
    card.appendChild(quantityP);
    card.appendChild(removeFromCartBtn);

    cartList.appendChild(card);
  });
}

productForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("productName").value.trim();
  const type = document.getElementById("productType").value;
  const quantity = parseInt(document.getElementById("productQuantity").value, 10);
  const imageInput = document.getElementById("productImage");

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const newProduct = {
        name,
        type,
        quantity,
        image: e.target.result
      };
      products.push(newProduct);
      saveProducts();
      renderProducts();
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    const newProduct = {
      name,
      type,
      quantity,
      image: ""
    };
    products.push(newProduct);
    saveProducts();
    renderProducts();
  }

  productForm.reset();
});

// Initial render
renderProducts();
renderCart();
