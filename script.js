const products = [
  { id: 1, name: "T-shirt", price: 299, image: "https://via.placeholder.com/200" },
  { id: 2, name: "Shoes", price: 799, image: "https://via.placeholder.com/200" },
  { id: 3, name: "Backpack", price: 499, image: "https://via.placeholder.com/200" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(p => p.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

function renderProducts(filteredList = products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  filteredList.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="\${product.image}" alt="\${product.name}">
      <h3>\${product.name}</h3>
      <p>₹\${product.price}</p>
      <button onclick="addToCart(\${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

document.getElementById("search").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});

renderProducts();
updateCartCount();
