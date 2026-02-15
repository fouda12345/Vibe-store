const Storage = {
  getUsers() {
    return JSON.parse(localStorage.getItem("vibe_users") || "[]");
  },
  saveUser(user) {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem("vibe_users", JSON.stringify(users));
  },
  updateUser(updatedUser) {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem("vibe_users", JSON.stringify(users));
    }
  },
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("vibe_current_user") || "null");
  },
  setCurrentUser(user) {
    localStorage.setItem("vibe_current_user", JSON.stringify(user));
  },
  clearCurrentUser() {
    localStorage.removeItem("vibe_current_user");
  },
  getCart(userId) {
    const carts = JSON.parse(localStorage.getItem("vibe_carts") || "{}");
    return carts[userId] || [];
  },
  saveCart(userId, cart) {
    const carts = JSON.parse(localStorage.getItem("vibe_carts") || "{}");
    carts[userId] = cart;
    localStorage.setItem("vibe_carts", JSON.stringify(carts));
  },
  getFavorites(userId) {
    const favs = JSON.parse(localStorage.getItem("vibe_favorites") || "{}");
    return favs[userId] || [];
  },
  toggleFavorite(userId, productId) {
    const favs = JSON.parse(localStorage.getItem("vibe_favorites") || "{}");
    const userFavs = favs[userId] || [];
    const index = userFavs.indexOf(productId);
    if (index > -1) {
      userFavs.splice(index, 1);
    } else {
      userFavs.push(productId);
    }
    favs[userId] = userFavs;
    localStorage.setItem("vibe_favorites", JSON.stringify(favs));
    return userFavs;
  },
  getReviews(productId) {
    const reviews = JSON.parse(localStorage.getItem("vibe_reviews") || "{}");
    return reviews[productId] || [];
  },
  addReview(productId, review) {
    const reviews = JSON.parse(localStorage.getItem("vibe_reviews") || "{}");
    if (!reviews[productId]) reviews[productId] = [];
    reviews[productId].unshift(review);
    localStorage.setItem("vibe_reviews", JSON.stringify(reviews));
  },
  getOrders(userId) {
    const orders = JSON.parse(localStorage.getItem("vibe_orders") || "{}");
    return orders[userId] || [];
  },
  addOrder(userId, order) {
    const orders = JSON.parse(localStorage.getItem("vibe_orders") || "{}");
    if (!orders[userId]) orders[userId] = [];
    orders[userId].unshift(order);
    localStorage.setItem("vibe_orders", JSON.stringify(orders));
  },
  getTheme() {
    return localStorage.getItem("vibe_theme") || "light";
  },
  setTheme(theme) {
    localStorage.setItem("vibe_theme", theme);
  },
};

const Validation = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },
  password: {
    pattern: /.{6,}/,
    message: "Password must be at least 6 characters",
  },
  phone: {
    pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    message: "Please enter a valid phone number",
  },
  name: {
    pattern: /^[a-zA-Z\s]{2,50}$/,
    message: "Name must be 2-50 letters only",
  },
  validate(field, value) {
    const rule = this[field];
    if (!rule) return { valid: true };
    const valid = rule.pattern.test(value);
    return { valid, message: valid ? "" : rule.message };
  },
};

const Helpers = {
  formatPrice(price) {
    return "$" + price.toFixed(2);
  },
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  getStarRating(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    let html = "";
    for (let i = 0; i < full; i++)
      html +=
        '<svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
    if (half)
      html +=
        '<svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="gray" stop-opacity="0.3"/></linearGradient></defs><path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
    for (let i = 0; i < empty; i++)
      html +=
        '<svg class="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
    return html;
  },
};
