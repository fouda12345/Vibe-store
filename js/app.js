const Views = {
  home() {
    const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);
    const categories = [
      {
        name: "Men",
        image:
          "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe1-600x600.jpg",
        count: PRODUCTS.filter((p) => p.category === "Men").length,
      },
      {
        name: "Women",
        image:
          "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-w-jeans2-600x600.jpg",
        count: PRODUCTS.filter((p) => p.category === "Women").length,
      },
      {
        name: "Accessories",
        image:
          "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-accessory2-600x600.jpg",
        count: PRODUCTS.filter((p) => p.category === "Accessories").length,
      },
    ];

    return `
      <section class="relative bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900 py-20 lg:py-32 overflow-hidden">
        <div class="absolute inset-0 opacity-30">
          <div class="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div class="absolute top-40 right-10 w-72 h-72 bg-accent-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style="animation-delay: 2s"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="slide-up">
              <span class="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-sm font-semibold mb-6">New Collection 2024</span>
              <h1 class="text-5xl lg:text-7xl font-display font-bold mb-6 leading-tight">
                Express Your <span class="gradient-text">VIBE</span>
              </h1>
              <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Discover curated fashion that speaks to your soul. Bold, playful, and uniquely you.
              </p>
              <div class="flex flex-wrap gap-4">
                <button onclick="Router.navigate('shop')" class="bg-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-700 transform hover:scale-105 transition shadow-lg hover:shadow-xl">
                  Shop Now
                </button>
                <button onclick="Router.navigate('shop', {category: 'Men'})" class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition border border-gray-200 dark:border-gray-700">
                  View Men
                </button>
              </div>
            </div>
            <div class="relative bounce-in">
              <img src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe1-600x600.jpg" 
                   alt="Hero Product" 
                   class="rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500 w-full">
              <div class="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <p class="font-bold">Premium Quality</p>
                    <p class="text-sm text-gray-500">Curated selection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 bg-white dark:bg-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-display font-bold mb-4">Shop by Category</h2>
            <p class="text-gray-600 dark:text-gray-400">Explore our collections</p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            ${categories
              .map(
                (cat, i) => `
              <div onclick="Router.navigate('shop', {category: '${cat.name}'})" 
                   class="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-105 transition duration-300"
                   style="animation-delay: ${i * 100}ms">
                <img src="${cat.image}" alt="${cat.name}" class="w-full h-96 object-cover group-hover:scale-110 transition duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 p-8">
                  <h3 class="text-2xl font-bold text-white mb-2">${cat.name}</h3>
                  <p class="text-white/80">${cat.count} Products</p>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="py-20 bg-gray-50 dark:bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-end mb-12">
            <div>
              <h2 class="text-4xl font-display font-bold mb-4">Featured Products</h2>
              <p class="text-gray-600 dark:text-gray-400">Handpicked favorites just for you</p>
            </div>
            <button onclick="Router.navigate('shop')" class="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition">
              View All <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            ${featuredProducts.map((p, i) => this.productCard(p, i)).join("")}
          </div>
        </div>
      </section>

      <section class="py-20 bg-primary-600 dark:bg-primary-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-4 gap-8 text-center text-white">
            <div class="bounce-in" style="animation-delay: 0ms">
              <svg class="w-12 h-12 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              <h3 class="font-bold text-lg mb-2">Free Shipping</h3>
              <p class="opacity-80 text-sm">On orders over $100</p>
            </div>
            <div class="bounce-in" style="animation-delay: 100ms">
              <svg class="w-12 h-12 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              <h3 class="font-bold text-lg mb-2">Secure Payment</h3>
              <p class="opacity-80 text-sm">100% secure checkout</p>
            </div>
            <div class="bounce-in" style="animation-delay: 200ms">
              <svg class="w-12 h-12 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              <h3 class="font-bold text-lg mb-2">Easy Returns</h3>
              <p class="opacity-80 text-sm">30-day return policy</p>
            </div>
            <div class="bounce-in" style="animation-delay: 300ms">
              <svg class="w-12 h-12 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              <h3 class="font-bold text-lg mb-2">24/7 Support</h3>
              <p class="opacity-80 text-sm">Dedicated support</p>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  productCard(p, index = 0) {
    const price =
      p.type === "variable"
        ? "$" +
          Math.min(...p.variations.map((v) => v.price)) +
          " - $" +
          Math.max(...p.variations.map((v) => v.price))
        : p.price;
    const isFav =
      Auth.currentUser &&
      Storage.getFavorites(Auth.currentUser.id).includes(p.id);

    return `
      <div class="product-card group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 fade-in" style="animation-delay: ${index * 50}ms">
        <div class="relative overflow-hidden aspect-square">
          <img src="${p.images[0]}" alt="${p.name}" class="product-image w-full h-full object-cover">
          ${p.featured ? '<span class="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-bold">FEATURED</span>' : ""}
          ${p.rating ? `<div class="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 px-2 py-1 rounded-lg flex items-center gap-1"><svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><span class="text-sm font-bold">${p.rating}</span></div>` : ""}
          
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button onclick="event.stopPropagation(); Router.navigate('product', {id: ${p.id}})" class="bg-white text-gray-900 p-3 rounded-full hover:bg-primary-50 transition transform hover:scale-110" title="View Details">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </button>
            <button onclick="event.stopPropagation(); Shop.quickAdd(${p.id})" class="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition transform hover:scale-110" title="Quick Add">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
            <button onclick="event.stopPropagation(); Product.toggleFavorite(${p.id})" class="${isFav ? "bg-red-500 text-white" : "bg-white text-gray-900"} p-3 rounded-full hover:bg-red-50 hover:text-red-500 transition transform hover:scale-110" title="Add to Favorites">
              <svg class="w-5 h-5 ${isFav ? "fill-current" : ""}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </button>
          </div>
        </div>
        <div class="p-6">
          <p class="text-xs text-primary-600 font-semibold uppercase tracking-wide mb-2">${p.category}</p>
          <h3 class="font-bold text-lg mb-2 group-hover:text-primary-600 transition cursor-pointer" onclick="Router.navigate('product', {id: ${p.id}})">${p.name}</h3>
          <div class="flex items-center justify-between">
            <span class="text-xl font-bold text-gray-900 dark:text-white">${price}</span>
            ${p.type === "variable" ? '<span class="text-sm text-gray-500">' + p.variations.length + " colors</span>" : ""}
          </div>
        </div>
      </div>
    `;
  },

  shop(params = {}) {
    setTimeout(() => Shop.init(), 0);
    if (params.category) {
      Shop.currentFilters.category = params.category;
    }

    return `
      <section class="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mb-8">
            <h1 class="text-4xl font-display font-bold mb-4">Shop All Products</h1>
            <p class="text-gray-600 dark:text-gray-400">Discover our curated collection of ${PRODUCTS.length} products</p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8 sticky top-20 z-30">
            <div class="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
              <div class="relative w-full lg:w-96">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input type="text" id="shop-search" placeholder="Search products..." 
                       class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                       value="${Shop.currentFilters.search}">
              </div>

              <div class="flex flex-wrap gap-3 w-full lg:w-auto">
                <select id="filter-category" class="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer">
                  <option value="all" ${Shop.currentFilters.category === "all" ? "selected" : ""}>All Categories</option>
                  <option value="Men" ${Shop.currentFilters.category === "Men" ? "selected" : ""}>Men</option>
                  <option value="Women" ${Shop.currentFilters.category === "Women" ? "selected" : ""}>Women</option>
                  <option value="Accessories" ${Shop.currentFilters.category === "Accessories" ? "selected" : ""}>Accessories</option>
                </select>

                <select id="filter-price" class="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer">
                  <option value="all" ${Shop.currentFilters.priceRange === "all" ? "selected" : ""}>All Prices</option>
                  <option value="0-50" ${Shop.currentFilters.priceRange === "0-50" ? "selected" : ""}>Under $50</option>
                  <option value="50-100" ${Shop.currentFilters.priceRange === "50-100" ? "selected" : ""}>$50 - $100</option>
                  <option value="100-200" ${Shop.currentFilters.priceRange === "100-200" ? "selected" : ""}>$100 - $200</option>
                  <option value="200+" ${Shop.currentFilters.priceRange === "200+" ? "selected" : ""}>$200+</option>
                </select>

                <select id="sort-products" class="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer">
                  <option value="featured" ${Shop.currentFilters.sort === "featured" ? "selected" : ""}>Sort by: Featured</option>
                  <option value="price-low" ${Shop.currentFilters.sort === "price-low" ? "selected" : ""}>Price: Low to High</option>
                  <option value="price-high" ${Shop.currentFilters.sort === "price-high" ? "selected" : ""}>Price: High to Low</option>
                  <option value="name" ${Shop.currentFilters.sort === "name" ? "selected" : ""}>Name: A-Z</option>
                </select>
              </div>
            </div>
          </div>

          <div class="mb-6 flex justify-between items-center">
            <p class="text-gray-600 dark:text-gray-400">Showing <span id="results-count" class="font-bold text-gray-900 dark:text-white">${Shop.filteredProducts.length}</span> products</p>
            ${params.category ? `<button onclick="Shop.currentFilters.category='all'; document.getElementById('filter-category').value='all'; Shop.applyFilters();" class="text-primary-600 hover:underline text-sm">Clear Filters</button>` : ""}
          </div>

          <div id="products-grid" class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          </div>

          <div id="no-results" class="hidden text-center py-20">
            <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <h3 class="text-xl font-bold mb-2">No products found</h3>
            <p class="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <button onclick="Shop.currentFilters={category:'all',priceRange:'all',sort:'featured',search:''}; Shop.applyFilters(); document.getElementById('shop-search').value=''; document.getElementById('filter-category').value='all'; document.getElementById('filter-price').value='all';" class="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">Clear All Filters</button>
          </div>
        </div>
      </section>
    `;
  },
  product(params = {}) {
    setTimeout(() => Product.init(), 0);
    const product =
      PRODUCTS.find((p) => p.id === (params.id || 1)) || PRODUCTS[0];
    const reviews = Storage.getReviews(product.id);
    const avgRating =
      reviews.length > 0
        ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(
            1,
          )
        : 0;
    const userReview = Auth.currentUser
      ? reviews.find((r) => r.userId === Auth.currentUser.id)
      : null;

    return `
      <section class="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <span onclick="Router.navigate('home')" class="hover:text-primary-600 cursor-pointer">Home</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            <span onclick="Router.navigate('shop')" class="hover:text-primary-600 cursor-pointer">Shop</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            <span class="text-gray-900 dark:text-white font-medium">${product.name}</span>
          </nav>

          <div class="grid lg:grid-cols-2 gap-12">
            <div class="space-y-4">
              <div class="aspect-square bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <img id="main-image" src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover transition duration-500">
              </div>
              <div class="grid grid-cols-4 gap-4">
                ${product.images
                  .map(
                    (img, i) => `
                  <button onclick="Product.changeImage('${img}')" class="aspect-square rounded-xl overflow-hidden border-2 ${i === 0 ? "border-primary-500" : "border-transparent"} hover:border-primary-300 transition">
                    <img src="${img}" class="w-full h-full object-cover">
                  </button>
                `,
                  )
                  .join("")}
              </div>
            </div>

            <div class="space-y-6">
              <div>
                <p class="text-primary-600 font-semibold uppercase tracking-wide text-sm mb-2">${product.category}</p>
                <h1 class="text-4xl font-display font-bold mb-4">${product.name}</h1>
                <div class="flex items-center gap-4 mb-4">
                  <div class="flex items-center gap-1">
                    ${Helpers.getStarRating(parseFloat(avgRating))}
                  </div>
                  <span class="text-gray-500">(${reviews.length} reviews)</span>
                </div>
                <p id="product-price" class="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</p>
              </div>

              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">${product.description}</p>

              ${
                product.variations.length > 0
                  ? `
                <div>
                  <p class="font-semibold mb-3">Select Color:</p>
                  <div id="color-selector" class="flex gap-3">
                    ${product.variations
                      .map(
                        (v, i) => `
                      <button onclick="Product.selectVariation(${i})" 
                              class="w-12 h-12 rounded-full border-2 ${i === 0 ? "border-primary-500 ring-2 ring-primary-200" : "border-gray-300"} transition hover:scale-110 relative overflow-hidden"
                              style="background-color: ${v.color};"
                              title="${v.color}">
                        ${i === 0 ? '<div class="absolute inset-0 flex items-center justify-center"><svg class="w-6 h-6 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div>' : ""}
                      </button>
                    `,
                      )
                      .join("")}
                  </div>
                  <p id="selected-color" class="text-sm text-gray-500 mt-2">Selected: ${product.variations[0].color}</p>
                </div>
              `
                  : ""
              }

              <div class="flex items-center gap-6">
                <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl">
                  <button onclick="Product.updateQuantity(-1)" class="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-xl transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                  </button>
                  <span id="quantity" class="px-4 py-3 font-bold min-w-[3rem] text-center">1</span>
                  <button onclick="Product.updateQuantity(1)" class="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-xl transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  </button>
                </div>
                <button onclick="Product.addToCart()" class="flex-1 bg-primary-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-700 transform hover:scale-105 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                  Add to Cart
                </button>
                <button id="fav-btn" onclick="Product.toggleFavorite()" class="p-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </button>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
                <h3 class="text-2xl font-bold mb-6">Customer Reviews</h3>
                
                ${
                  Auth.currentUser && !userReview
                    ? `
                  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
                    <h4 class="font-semibold mb-4">Write a Review</h4>
                    <div class="flex gap-2 mb-4" id="rating-input">
                      ${[1, 2, 3, 4, 5]
                        .map(
                          (i) => `
                        <button onclick="Product.setRating(${i})" class="text-2xl text-gray-300 hover:text-yellow-400 transition">★</button>
                      `,
                        )
                        .join("")}
                    </div>
                    <textarea id="review-text" rows="3" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4" placeholder="Share your thoughts..."></textarea>
                    <button onclick="Product.submitReview()" class="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition">Submit Review</button>
                  </div>
                `
                    : Auth.currentUser && userReview
                      ? `<div class="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-4 rounded-xl mb-6">You have already reviewed this product. Thank you!</div>`
                      : `<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-6 text-center"><p class="text-gray-600 dark:text-gray-400">Please <span onclick="Router.navigate('login')" class="text-primary-600 cursor-pointer hover:underline">login</span> to write a review</p></div>`
                }

                <div id="reviews-list" class="space-y-6">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  cart() {
    setTimeout(() => Cart.init(), 0);
    return `
      <section class="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-display font-bold mb-8">Shopping Cart</h1>
          
          <div class="grid lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
              <div id="cart-items">
              </div>
            </div>

            <div class="lg:col-span-1">
              <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-24">
                <h3 class="text-xl font-bold mb-6">Order Summary</h3>
                <div class="space-y-4 mb-6">
                  <div class="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span id="cart-subtotal" class="font-medium text-gray-900 dark:text-white">$0.00</span>
                  </div>
                  <div class="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span class="text-green-600">Free</span>
                  </div>
                  <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div class="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span id="cart-total" class="text-primary-600">$0.00</span>
                    </div>
                  </div>
                </div>
                <button id="checkout-btn" onclick="Router.navigate('checkout')" disabled class="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:scale-105">
                  Proceed to Checkout
                </button>
                <button onclick="Router.navigate('shop')" class="w-full mt-4 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  checkout() {
    setTimeout(() => Checkout.init(), 0);
    return `
      <section class="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-display font-bold mb-8">Checkout</h1>
          
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <form id="checkout-form" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium mb-2">Full Name *</label>
                  <input type="text" id="checkout-name" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" placeholder="John Doe">
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Email *</label>
                  <input type="email" id="checkout-email" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" placeholder="john@example.com">
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Phone *</label>
                <input type="tel" id="checkout-phone" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" placeholder="+1 234 567 890">
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Address *</label>
                <input type="text" id="checkout-address" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" placeholder="123 Main Street">
              </div>
              
              <div class="grid md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium mb-2">City *</label>
                  <input type="text" id="checkout-city" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition">
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">State *</label>
                  <input type="text" id="checkout-state" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition">
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">ZIP Code *</label>
                  <input type="text" id="checkout-zip" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition">
                </div>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                <div class="flex justify-between items-center mb-6">
                  <span class="text-xl font-bold">Total Amount</span>
                  <span id="checkout-total" class="text-3xl font-bold text-primary-600">$0.00</span>
                </div>
                <button type="submit" class="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transform hover:scale-105 transition shadow-lg">
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    `;
  },

  login() {
    setTimeout(() => {
      const form = document.getElementById("login-form");
      if (form) {
        Auth.setupValidation(form);
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          Auth.handleLogin();
        });
      }
    }, 0);

    return `
      <section class="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center">
        <div class="max-w-md mx-auto px-4 w-full">
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <div class="text-center mb-8">
              <h1 class="text-3xl font-display font-bold mb-2">Welcome Back</h1>
              <p class="text-gray-600 dark:text-gray-400">Sign in to your account</p>
            </div>
            
            <form id="login-form" class="space-y-6">
              <div>
                <label class="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" id="login-email" data-validate="email" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" placeholder="you@example.com">
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Password</label>
                <input type="password" id="login-password" data-validate="password" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" placeholder="••••••••">
              </div>
              
              <button type="submit" class="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transform hover:scale-105 transition shadow-lg">
                Sign In
              </button>
            </form>
            
            <div class="mt-6 text-center">
              <p class="text-gray-600 dark:text-gray-400">Don't have an account? <span onclick="Router.navigate('signup')" class="text-primary-600 font-semibold cursor-pointer hover:underline">Sign up</span></p>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  signup() {
    setTimeout(() => {
      const form = document.getElementById("signup-form");
      if (form) {
        Auth.setupValidation(form);
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          Auth.handleSignup();
        });
      }
    }, 0);

    return `
      <section class="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center">
        <div class="max-w-md mx-auto px-4 w-full">
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <div class="text-center mb-8">
              <h1 class="text-3xl font-display font-bold mb-2">Create Account</h1>
              <p class="text-gray-600 dark:text-gray-400">Join our community today</p>
            </div>
            
            <form id="signup-form" class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Full Name</label>
                <input type="text" id="signup-name" data-validate="name" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" placeholder="John Doe">
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" id="signup-email" data-validate="email" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" placeholder="you@example.com">
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Phone Number</label>
                <input type="tel" id="signup-phone" data-validate="phone" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" placeholder="+1 234 567 890">
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Password</label>
                <input type="password" id="signup-password" data-validate="password" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" placeholder="••••••••">
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Confirm Password</label>
                <input type="password" id="signup-confirm" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" placeholder="••••••••">
              </div>
              
              <button type="submit" class="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transform hover:scale-105 transition shadow-lg mt-6">
                Create Account
              </button>
            </form>
            
            <div class="mt-6 text-center">
              <p class="text-gray-600 dark:text-gray-400">Already have an account? <span onclick="Router.navigate('login')" class="text-primary-600 font-semibold cursor-pointer hover:underline">Sign in</span></p>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  profile() {
    setTimeout(() => {
      if (!Auth.requireAuth()) return;
      Profile.init();
      document.getElementById("profile-name").value = Auth.currentUser.name;
      document.getElementById("profile-phone").value = Auth.currentUser.phone;
      document.getElementById("profile-address").value =
        Auth.currentUser.address || "";
    }, 0);

    return `
      <section class="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-display font-bold mb-8">My Profile</h1>
          
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-3xl font-bold">
                ${Auth.currentUser ? Auth.currentUser.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <h2 class="text-2xl font-bold">${Auth.currentUser ? Auth.currentUser.name : ""}</h2>
                <p class="text-gray-500">${Auth.currentUser ? Auth.currentUser.email : ""}</p>
              </div>
            </div>
            
            <form id="profile-form" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium mb-2">Full Name</label>
                  <input type="text" id="profile-name" data-validate="name" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition">
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Phone Number</label>
                  <input type="tel" id="profile-phone" data-validate="phone" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition">
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Address</label>
                <textarea id="profile-address" rows="3" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" placeholder="Your shipping address..."></textarea>
              </div>
              
              <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 class="font-bold mb-4">Change Password</h3>
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium mb-2">Current Password</label>
                    <input type="password" id="profile-current-password" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" placeholder="Leave blank to keep current">
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">New Password</label>
                    <input type="password" id="profile-new-password" data-validate="password" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" placeholder="Min 6 characters">
                  </div>
                </div>
              </div>
              
              <div class="flex gap-4">
                <button type="submit" class="flex-1 bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition">
                  Save Changes
                </button>
                <button type="button" onclick="Auth.logout()" class="px-6 py-3 border border-red-500 text-red-500 rounded-xl font-medium hover:bg-red-50 transition">
                  Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    `;
  },

  orders() {
    setTimeout(() => Orders.init(), 0);
    return `
      <section class="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-display font-bold mb-8">My Orders</h1>
          <div id="orders-list" class="space-y-6">
          </div>
        </div>
      </section>
    `;
  },

  about() {
    return `
      <section class="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-5xl font-display font-bold mb-8 gradient-text">About VIBE</h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
            We're more than just a fashion store. We're a movement that celebrates individuality, 
            creativity, and the courage to express yourself. Founded in 2024, VIBE has grown from 
            a small passion project to a community of bold individuals who aren't afraid to stand out.
          </p>
          
          <div class="grid md:grid-cols-3 gap-8 mt-16">
            <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 class="font-bold text-xl mb-2">Our Mission</h3>
              <p class="text-gray-600 dark:text-gray-400">Empowering individuals to express their unique style with confidence.</p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div class="w-16 h-16 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </div>
              <h3 class="font-bold text-xl mb-2">Our Values</h3>
              <p class="text-gray-600 dark:text-gray-400">Quality, sustainability, and inclusivity in everything we create.</p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 class="font-bold text-xl mb-2">Our Promise</h3>
              <p class="text-gray-600 dark:text-gray-400">Exceptional customer service and products that exceed expectations.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  },
};
const Router = {
  currentRoute: "home",
  routes: {
    home: () => Views.home(),
    shop: (params) => Views.shop(params),
    product: (params) => Views.product(params),
    cart: () => Views.cart(),
    checkout: () => Views.checkout(),
    login: () => Views.login(),
    signup: () => Views.signup(),
    profile: () => Views.profile(),
    orders: () => Views.orders(),
    about: () => Views.about(),
  },

  navigate(route, params = {}) {
    this.currentRoute = route;
    window.scrollTo(0, 0);
    const app = document.getElementById("app");
    if (this.routes[route]) {
      app.innerHTML = this.routes[route](params);
      this.afterRender(route);
    }
  },

  afterRender(route) {
    if (route === "shop") {
      Shop.init();
    } else if (route === "product") {
    } else if (route === "cart") {
      Cart.init();
    } else if (route === "checkout") {
      Checkout.init();
    } else if (route === "login") {
    } else if (route === "signup") {
    } else if (route === "profile") {
    } else if (route === "orders") {
      Orders.init();
    }
  },
};
const App = {
  init() {
    this.initTheme();

    Auth.init();

    Cart.updateCartCount();

    Router.navigate("home");

    document.addEventListener("click", (e) => {
      const userMenu = document.getElementById("user-menu");
      const dropdown = document.getElementById("user-dropdown");
      if (userMenu && dropdown && !userMenu.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    });
  },

  initTheme() {
    const savedTheme = Storage.getTheme();
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      this.updateThemeIcon("dark");
    }
  },



  updateThemeIcon(theme) {
    const icon = document.getElementById("theme-icon");
    if (!icon) return;
    if (theme === "dark") {
      icon.innerHTML =
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
    } else {
      icon.innerHTML =
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
    }
  },

  toggleUserMenu() {
    const dropdown = document.getElementById("user-dropdown");
    if (dropdown) {
      dropdown.classList.toggle("hidden");
    }
  },

  showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    const colors = {
      success: "bg-green-500",
      error: "bg-red-500",
      info: "bg-primary-600",
    };
    toast.className = `${colors[type]} text-white px-6 py-3 rounded-xl shadow-lg transform translate-y-10 opacity-0 transition-all duration-300 flex items-center gap-2`;
    toast.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentElement.remove()" class="ml-2 hover:opacity-80">×</button>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("translate-y-10", "opacity-0");
    }, 10);

    setTimeout(() => {
      toast.classList.add("translate-y-10", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },
  toggleMobileSidebar() {
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar && overlay) {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
      
      if (sidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
        this.updateMobileUserSection();
      } else {
        document.body.style.overflow = '';
      }
    }
  },


  updateMobileUserSection() {
    const container = document.getElementById('mobile-user-section');
    if (!container) return;

    if (Auth.currentUser) {
      container.innerHTML = `
        <div class="flex items-center gap-3 mb-4 px-4">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
            ${Auth.currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p class="font-bold">${Auth.currentUser.name}</p>
            <p class="text-sm text-gray-500">${Auth.currentUser.email}</p>
          </div>
        </div>
        <div class="space-y-2">
          <a onclick="App.toggleMobileSidebar(); Router.navigate('profile')" class="block py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition cursor-pointer">
            My Profile
          </a>
          <a onclick="App.toggleMobileSidebar(); Router.navigate('orders')" class="block py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition cursor-pointer">
            My Orders
          </a>
          <button onclick="Auth.logout(); App.toggleMobileSidebar();" class="w-full text-left py-3 px-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 font-medium transition">
            Logout
          </button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="space-y-3 px-4">
          <button onclick="App.toggleMobileSidebar(); Router.navigate('login')" class="w-full py-3 px-4 rounded-xl border-2 border-primary-600 text-primary-600 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition">
            Login
          </button>
          <button onclick="App.toggleMobileSidebar(); Router.navigate('signup')" class="w-full py-3 px-4 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition">
            Create Account
          </button>
        </div>
      `;
    }
  },


  toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    Storage.setTheme(isDark ? 'dark' : 'light');
    this.updateThemeIcon(isDark ? 'dark' : 'light');
    
    const mobileThemeText = document.getElementById('mobile-theme-text');
    if (mobileThemeText) {
      mobileThemeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
    
    const mobileThemeIcon = document.getElementById('mobile-theme-icon');
    if (mobileThemeIcon) {
      if (isDark) {
        mobileThemeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
      } else {
        mobileThemeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
      }
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
