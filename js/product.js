const Product = {
  currentProduct: null,
  currentVariation: 0,
  currentQuantity: 1,
  currentRating: 0,
  init() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id")) || 1;
    this.currentProduct =
      PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
    this.currentVariation = 0;
    this.currentQuantity = 1;
    this.renderReviews();
    this.updateFavoriteButton();
  },
  changeImage(src) {
    document.getElementById("main-image").src = src;
  },
  selectVariation(index) {
    this.currentVariation = index;
    const variation = this.currentProduct.variations[index];
    document.getElementById("product-price").textContent =
      "$" + variation.price.toFixed(2);
    this.changeImage(variation.image);
    const buttons = document.querySelectorAll("#color-selector button");
    buttons.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add("border-primary-500", "ring-2", "ring-primary-200");
        btn.classList.remove("border-gray-300");
      } else {
        btn.classList.remove(
          "border-primary-500",
          "ring-2",
          "ring-primary-200",
        );
        btn.classList.add("border-gray-300");
      }
    });
  },
  updateQuantity(change) {
    this.currentQuantity = Math.max(1, this.currentQuantity + change);
    document.getElementById("quantity").textContent = this.currentQuantity;
  },
  addToCart() {
    if (!Auth.currentUser) {
      App.showToast("Please login to add to cart", "error");
      Router.navigate("login");
      return;
    }
    const variation =
      this.currentProduct.variations[this.currentVariation] || null;
    const cartItem = {
      id: Helpers.generateId(),
      productId: this.currentProduct.id,
      name: this.currentProduct.name,
      price: variation
        ? variation.price
        : parseFloat(this.currentProduct.price.replace("$", "")),
      image: variation ? variation.image : this.currentProduct.images[0],
      quantity: this.currentQuantity,
      color: variation ? variation.color : null,
    };
    const cart = Storage.getCart(Auth.currentUser.id);
    cart.push(cartItem);
    Storage.saveCart(Auth.currentUser.id, cart);
    Cart.updateCartCount();
    App.showToast("Added to cart!", "success");
  },
  toggleFavorite() {
    if (!Auth.currentUser) {
      App.showToast("Please login to add favorites", "error");
      Router.navigate("login");
      return;
    }
    const favs = Storage.toggleFavorite(
      Auth.currentUser.id,
      this.currentProduct.id,
    );
    this.updateFavoriteButton(favs);
    App.showToast(
      favs.includes(this.currentProduct.id)
        ? "Added to favorites!"
        : "Removed from favorites",
      "success",
    );
  },
  updateFavoriteButton(favs) {
    if (!favs && Auth.currentUser) {
      favs = Storage.getFavorites(Auth.currentUser.id);
    }
    const btn = document.getElementById("fav-btn");
    if (!btn) return;
    if (favs && favs.includes(this.currentProduct.id)) {
      btn.classList.add("text-red-500", "bg-red-50");
      btn.innerHTML =
        '<svg class="w-6 h-6 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path></svg>';
    } else {
      btn.classList.remove("text-red-500", "bg-red-50");
      btn.innerHTML =
        '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>';
    }
  },
  setRating(rating) {
    this.currentRating = rating;
    const stars = document.querySelectorAll("#rating-input button");
    stars.forEach((star, i) => {
      if (i < rating) {
        star.classList.add("text-yellow-400");
        star.classList.remove("text-gray-300");
      } else {
        star.classList.remove("text-yellow-400");
        star.classList.add("text-gray-300");
      }
    });
  },
  submitReview() {
    const text = document.getElementById("review-text").value;
    if (!text.trim() || this.currentRating === 0) {
      App.showToast("Please provide a rating and review", "error");
      return;
    }
    const review = {
      id: Helpers.generateId(),
      userId: Auth.currentUser.id,
      userName: Auth.currentUser.name,
      rating: this.currentRating,
      text: text,
      date: new Date().toISOString(),
    };
    Storage.addReview(this.currentProduct.id, review);
    this.renderReviews();
    document.getElementById("review-text").value = "";
    this.setRating(0);
    App.showToast("Review submitted!", "success");
  },
  renderReviews() {
    const container = document.getElementById("reviews-list");
    if (!container) return;
    const reviews = Storage.getReviews(this.currentProduct.id);
    if (reviews.length === 0) {
      container.innerHTML =
        '<p class="text-gray-500 text-center py-4">No reviews yet. Be the first to review!</p>';
      return;
    }
    container.innerHTML = reviews
      .map(
        (r) => `
      <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 font-bold text-sm">${r.userName.charAt(0)}</div>
            <span class="font-medium">${r.userName}</span>
          </div>
          <span class="text-sm text-gray-500">${new Date(r.date).toLocaleDateString()}</span>
        </div>
        <div class="flex text-yellow-400 mb-2">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
        <p class="text-gray-600 dark:text-gray-300">${r.text}</p>
      </div>
    `,
      )
      .join("");
  },
};
