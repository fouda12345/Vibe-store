const Auth = {
  currentUser: null,
  
  init() {
    this.currentUser = Storage.getCurrentUser();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.updateUI());
    } else {
      this.updateUI();
    }
  },

  setupValidation(form) {
    const inputs = form.querySelectorAll('input[data-validate]');
    inputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const field = e.target.dataset.validate;
        const value = e.target.value;
        const result = Validation.validate(field, value);
        
        if (value.length === 0) {
          e.target.classList.remove('border-green-500', 'border-red-500');
          e.target.classList.add('border-gray-300');
        } else if (result.valid) {
          e.target.classList.remove('border-gray-300', 'border-red-500');
          e.target.classList.add('border-green-500');
        } else {
          e.target.classList.remove('border-gray-300', 'border-green-500');
          e.target.classList.add('border-red-500');
        }
      });
    });
  },

  handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const users = Storage.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      this.currentUser = user;
      Storage.setCurrentUser(user);
      
      this.updateUI();
      Cart.updateCartCount();
      
      if (document.getElementById('mobile-sidebar')?.classList.contains('open')) {
        App.updateMobileUserSection();
      }
      
      App.showToast('Welcome back, ' + user.name + '!', 'success');
      
      setTimeout(() => Router.navigate('home'), 500);
    } else {
      App.showToast('Invalid email or password', 'error');
    }
  },

  handleSignup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;

    if (!Validation.validate('name', name).valid) {
      App.showToast('Please enter a valid name', 'error');
      return;
    }
    if (!Validation.validate('email', email).valid) {
      App.showToast('Please enter a valid email', 'error');
      return;
    }
    if (!Validation.validate('phone', phone).valid) {
      App.showToast('Please enter a valid phone number', 'error');
      return;
    }
    if (!Validation.validate('password', password).valid) {
      App.showToast('Password must be at least 6 characters', 'error');
      return;
    }
    if (password !== confirmPassword) {
      App.showToast('Passwords do not match', 'error');
      return;
    }

    const users = Storage.getUsers();
    if (users.find(u => u.email === email)) {
      App.showToast('Email already registered', 'error');
      return;
    }

    const newUser = {
      id: Helpers.generateId(),
      name,
      email,
      phone,
      password,
      address: '',
      createdAt: new Date().toISOString()
    };

    Storage.saveUser(newUser);
    
    App.showToast('Account created successfully! Please login.', 'success');
    
    setTimeout(() => Router.navigate('login'), 1000);
  },

  logout() {
    this.currentUser = null;
    Storage.clearCurrentUser();
    this.updateUI();
    Cart.updateCartCount();
    
    const sidebar = document.getElementById('mobile-sidebar');
    if (sidebar?.classList.contains('open')) {
      App.toggleMobileSidebar();
    }
    
    App.showToast('Logged out successfully', 'success');
    Router.navigate('home');
  },

  updateUI() {
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    
    if (!authButtons || !userMenu) {
      console.log('Auth elements not found');
      return;
    }

    if (this.currentUser) {
      console.log('User logged in:', this.currentUser.name);
      
      authButtons.style.display = 'none';
      
      userMenu.style.display = 'flex';
      
      const userNameEl = document.getElementById('user-name');
      const userAvatar = document.getElementById('user-avatar');
      
      if (userNameEl) userNameEl.textContent = this.currentUser.name;
      if (userAvatar) userAvatar.textContent = this.currentUser.name.charAt(0).toUpperCase();
    } else {
      console.log('User logged out');
      
      authButtons.style.display = 'flex';
      
      userMenu.style.display = 'none';
    }
  },

  requireAuth() {
    if (!this.currentUser) {
      App.showToast('Please login to continue', 'error');
      Router.navigate('login');
      return false;
    }
    return true;
  }
};