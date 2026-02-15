const Shop = {
  products: PRODUCTS,
  filteredProducts: PRODUCTS,
  currentFilters: {
    category: "all",
    priceRange: "all",
    sort: "featured",
    search: "",
  },
  init() {
    this.setupEventListeners();
    this.applyFilters();
  },
  setupEventListeners() {
    const searchInput = document.getElementById("shop-search");
    if (searchInput) {
      searchInput.addEventListener(
        "input",
        Helpers.debounce((e) => {
          this.currentFilters.search = e.target.value.toLowerCase();
          this.applyFilters();
        }, 300),
      );
    }
    const categorySelect = document.getElementById("filter-category");
    if (categorySelect) {
      categorySelect.addEventListener("change", (e) => {
        this.currentFilters.category = e.target.value;
        this.applyFilters();
      });
    }
    const priceSelect = document.getElementById("filter-price");
    if (priceSelect) {
      priceSelect.addEventListener("change", (e) => {
        this.currentFilters.priceRange = e.target.value;
        this.applyFilters();
      });
    }
    const sortSelect = document.getElementById("sort-products");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.currentFilters.sort = e.target.value;
        this.applyFilters();
      });
    }
  },
  applyFilters() {
    let result = this.products;
    if (this.currentFilters.category !== "all") {
      result = result.filter(
        (p) => p.category === this.currentFilters.category,
      );
    }
    if (this.currentFilters.priceRange !== "all") {
      result = result.filter((p) => {
        const price =
          p.type === "variable"
            ? Math.min(...p.variations.map((v) => v.price))
            : parseFloat(p.price.replace("$", ""));
        switch (this.currentFilters.priceRange) {
          case "0-50":
            return price < 50;
          case "50-100":
            return price >= 50 && price <= 100;
          case "100-200":
            return price > 100 && price <= 200;
          case "200+":
            return price > 200;
          default:
            return true;
        }
      });
    }
    if (this.currentFilters.search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(this.currentFilters.search) ||
          p.description.toLowerCase().includes(this.currentFilters.search) ||
          p.category.toLowerCase().includes(this.currentFilters.search),
      );
    }
    switch (this.currentFilters.sort) {
      case "price-low":
        result.sort((a, b) => {
          const priceA =
            a.type === "variable"
              ? Math.min(...a.variations.map((v) => v.price))
              : parseFloat(a.price.replace("$", ""));
          const priceB =
            b.type === "variable"
              ? Math.min(...b.variations.map((v) => v.price))
              : parseFloat(b.price.replace("$", ""));
          return priceA - priceB;
        });
        break;
      case "price-high":
        result.sort((a, b) => {
          const priceA =
            a.type === "variable"
              ? Math.max(...a.variations.map((v) => v.price))
              : parseFloat(a.price.replace("$", ""));
          const priceB =
            b.type === "variable"
              ? Math.max(...b.variations.map((v) => v.price))
              : parseFloat(b.price.replace("$", ""));
          return priceB - priceA;
        });
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    this.filteredProducts = result;
    this.renderProducts();
  },
  renderProducts() {
    const grid = document.getElementById("products-grid");
    const noResults = document.getElementById("no-results");
    if (!grid) return;
    if (this.filteredProducts.length === 0) {
      grid.innerHTML = "";
      noResults.classList.remove("hidden");
    } else {
      noResults.classList.add("hidden");
      grid.innerHTML = this.filteredProducts
        .map((p, i) => Views.productCard(p, i))
        .join("");
    }
  },
  quickAdd(productId) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    if (!Auth.currentUser) {
      App.showToast("Please login to add to cart", "error");
      Router.navigate("login");
      return;
    }
    const cartItem = {
      id: Helpers.generateId(),
      productId: product.id,
      name: product.name,
      price:
        product.type === "variable"
          ? product.variations[0].price
          : parseFloat(product.price.replace("$", "")),
      image: product.images[0],
      quantity: 1,
      color: product.variations.length > 0 ? product.variations[0].color : null,
    };
    const cart = Storage.getCart(Auth.currentUser.id);
    cart.push(cartItem);
    Storage.saveCart(Auth.currentUser.id, cart);
    Cart.updateCartCount();
    App.showToast("Added to cart!", "success");
  },
};
