const Profile = {
  init() {
    if (!Auth.requireAuth()) return;
    document.getElementById("profile-form").addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveProfile();
    });
  },
  saveProfile() {
    const user = Auth.currentUser;
    user.name = document.getElementById("profile-name").value;
    user.phone = document.getElementById("profile-phone").value;
    user.address = document.getElementById("profile-address").value;
    const currentPassword = document.getElementById(
      "profile-current-password",
    ).value;
    const newPassword = document.getElementById("profile-new-password").value;
    if (currentPassword && newPassword) {
      if (currentPassword !== user.password) {
        App.showToast("Current password is incorrect", "error");
        return;
      }
      user.password = newPassword;
    }
    Storage.updateUser(user);
    Storage.setCurrentUser(user);
    Auth.currentUser = user;
    Auth.updateUI();
    document.getElementById("profile-current-password").value = "";
    document.getElementById("profile-new-password").value = "";
    App.showToast("Profile updated successfully!", "success");
  },
};

const Orders = {
  init() {
    if (!Auth.requireAuth()) return;
    this.renderOrders();
  },
  renderOrders() {
    const orders = Storage.getOrders(Auth.currentUser.id);
    const container = document.getElementById("orders-list");
    if (orders.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <p class="text-gray-500 mb-4">No orders yet</p>
          <button onclick="Router.navigate('shop')" class="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700">Start Shopping</button>
        </div>
      `;
      return;
    }
    container.innerHTML = orders
      .map(
        (order) => `
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-start mb-4">
          <div>
            <p class="text-sm text-gray-500">Order #${order.id.substr(-8).toUpperCase()}</p>
            <p class="text-sm text-gray-500">${new Date(order.date).toLocaleDateString()}</p>
          </div>
          <span class="px-3 py-1 rounded-full text-sm font-medium ${
            order.status === "Delivered"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : order.status === "Shipped"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }">${order.status}</span>
        </div>
        <div class="space-y-2 mb-4">
          ${order.items
            .map(
              (item) => `
            <div class="flex items-center gap-4">
              <img src="${item.image}" class="w-12 h-12 object-cover rounded" alt="${item.name}">
              <div class="flex-1">
                <p class="font-medium">${item.name}</p>
                <p class="text-sm text-gray-500">Qty: ${item.quantity}</p>
              </div>
              <p class="font-medium">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          `,
            )
            .join("")}
        </div>
        <div class="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between">
          <span class="font-bold">Total</span>
          <span class="font-bold text-primary-600">$${order.total.toFixed(2)}</span>
        </div>
      </div>
    `,
      )
      .join("");
  },
};
