const Checkout = {
  init() {
    if (!Auth.requireAuth()) return;
    const cart = Storage.getCart(Auth.currentUser.id);
    if (cart.length === 0) {
      App.showToast("Your cart is empty", "error");
      Router.navigate("shop");
      return;
    }
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    document.getElementById("checkout-total").textContent =
      "$" + total.toFixed(2);
    document.getElementById("checkout-form").addEventListener("submit", (e) => {
      e.preventDefault();
      this.placeOrder();
    });
    if (Auth.currentUser) {
      document.getElementById("checkout-name").value =
        Auth.currentUser.name || "";
      document.getElementById("checkout-email").value =
        Auth.currentUser.email || "";
      document.getElementById("checkout-phone").value =
        Auth.currentUser.phone || "";
      document.getElementById("checkout-address").value =
        Auth.currentUser.address || "";
    }
  },
  placeOrder() {
    const cart = Storage.getCart(Auth.currentUser.id);
    const order = {
      id: Helpers.generateId(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: "Processing",
      shipping: {
        name: document.getElementById("checkout-name").value,
        email: document.getElementById("checkout-email").value,
        phone: document.getElementById("checkout-phone").value,
        address: document.getElementById("checkout-address").value,
        city: document.getElementById("checkout-city").value,
        state: document.getElementById("checkout-state").value,
        zip: document.getElementById("checkout-zip").value,
      },
      date: new Date().toISOString(),
    };
    Storage.addOrder(Auth.currentUser.id, order);
    Storage.saveCart(Auth.currentUser.id, []);
    Cart.updateCartCount();
    App.showToast("Order placed successfully!", "success");
    setTimeout(() => Router.navigate("orders"), 1000);
  },
};
