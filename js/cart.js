const Cart = {
  init() {
    this.renderCart();
  },
  renderCart() {
    if (!Auth.currentUser) {
      document.getElementById("cart-items").innerHTML = `
        <div class="text-center py-12">
          <p class="text-gray-500 mb-4">Please login to view your cart</p>
          <button onclick="Router.navigate('login')" class="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700">Login</button>
        </div>
      `;
      return;
    }
    const cart = Storage.getCart(Auth.currentUser.id);
    const container = document.getElementById("cart-items");
    if (cart.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          <p class="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <button onclick="Router.navigate('shop')" class="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700">Continue Shopping</button>
        </div>
      `;
      document.getElementById("checkout-btn").disabled = true;
    } else {
      container.innerHTML = cart
        .map(
          (item, index) => `
        <div class="flex gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
          <img src="${item.image}" class="w-24 h-24 object-cover rounded-lg" alt="${item.name}">
          <div class="flex-1">
            <h3 class="font-bold">${item.name}</h3>
            ${item.color ? `<p class="text-sm text-gray-500">Color: ${item.color}</p>` : ""}
            <p class="text-primary-600 font-bold mt-1">$${item.price.toFixed(2)}</p>
            <div class="flex items-center gap-4 mt-2">
              <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                <button onclick="Cart.updateItemQuantity('${item.id}', -1)" class="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">-</button>
                <span class="px-3">${item.quantity}</span>
                <button onclick="Cart.updateItemQuantity('${item.id}', 1)" class="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">+</button>
              </div>
              <button onclick="Cart.removeItem('${item.id}')" class="text-red-500 text-sm hover:underline">Remove</button>
            </div>
          </div>
          <div class="text-right">
            <p class="font-bold">$${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      `,
        )
        .join("");
      document.getElementById("checkout-btn").disabled = false;
    }
    this.updateTotals();
  },
  updateItemQuantity(itemId, change) {
    const cart = Storage.getCart(Auth.currentUser.id);
    const item = cart.find((i) => i.id === itemId);
    if (item) {
      item.quantity = Math.max(1, item.quantity + change);
      Storage.saveCart(Auth.currentUser.id, cart);
      this.renderCart();
    }
  },
  removeItem(itemId) {
    let cart = Storage.getCart(Auth.currentUser.id);
    cart = cart.filter((i) => i.id !== itemId);
    Storage.saveCart(Auth.currentUser.id, cart);
    this.renderCart();
    this.updateCartCount();
    App.showToast("Item removed from cart", "success");
  },
  updateTotals() {
    if (!Auth.currentUser) return;
    const cart = Storage.getCart(Auth.currentUser.id);
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    document.getElementById("cart-subtotal").textContent =
      "$" + subtotal.toFixed(2);
    document.getElementById("cart-total").textContent =
      "$" + subtotal.toFixed(2);
  },
  updateCartCount() {
    if (!Auth.currentUser) {
      document.getElementById("cart-count").classList.add("hidden");
      return;
    }
    const cart = Storage.getCart(Auth.currentUser.id);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById("cart-count");
    if (count > 0) {
      badge.textContent = count;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  },
};
