import { create } from 'zustand';
import { Product, CartItem, Review, Order, WishlistItem, Category } from '../types';
import { mockProducts, mockReviews, mockOrders } from '../data/mockData';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, data: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* ignore */ }
}

interface StoreState {
  // Theme
  isDark: boolean;
  toggleTheme: () => void;

  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStatus: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  hasPurchased: (productId: string) => boolean;

  // Reviews
  reviews: Review[];
  addReview: (review: Review) => void;
  getProductReviews: (productId: string) => Review[];

  // Admin
  isAdminAuthenticated: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;

  // Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category | 'all';
  setSelectedCategory: (category: Category | 'all') => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'rating';
  setSortBy: (sort: 'newest' | 'price-asc' | 'price-desc' | 'rating') => void;

  getFilteredProducts: () => Product[];
}

const ADMIN_PASSWORD = 'admin123';

export const useStore = create<StoreState>((set, get) => ({
  // Theme
  isDark: loadFromStorage('digistore-theme', false),
  toggleTheme: () => {
    set((state) => {
      const newDark = !state.isDark;
      saveToStorage('digistore-theme', newDark);
      if (newDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { isDark: newDark };
    });
  },

  // Products
  products: loadFromStorage('digistore-products', mockProducts),
  addProduct: (product) => {
    set((state) => {
      const newProducts = [...state.products, product];
      saveToStorage('digistore-products', newProducts);
      return { products: newProducts };
    });
  },
  updateProduct: (id, updates) => {
    set((state) => {
      const newProducts = state.products.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      );
      saveToStorage('digistore-products', newProducts);
      return { products: newProducts };
    });
  },
  deleteProduct: (id) => {
    set((state) => {
      const newProducts = state.products.filter((p) => p.id !== id);
      saveToStorage('digistore-products', newProducts);
      return { products: newProducts };
    });
  },
  toggleProductStatus: (id) => {
    set((state) => {
      const newProducts = state.products.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'published' ? 'draft' as const : 'published' as const }
          : p
      );
      saveToStorage('digistore-products', newProducts);
      return { products: newProducts };
    });
  },

  // Cart
  cart: loadFromStorage('digistore-cart', []),
  addToCart: (product) => {
    set((state) => {
      const existing = state.cart.find((item) => item.product.id === product.id);
      let newCart: CartItem[];
      if (existing) {
        newCart = state.cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...state.cart, { product, quantity: 1 }];
      }
      saveToStorage('digistore-cart', newCart);
      return { cart: newCart };
    });
  },
  removeFromCart: (productId) => {
    set((state) => {
      const newCart = state.cart.filter((item) => item.product.id !== productId);
      saveToStorage('digistore-cart', newCart);
      return { cart: newCart };
    });
  },
  updateCartQuantity: (productId, quantity) => {
    set((state) => {
      const newCart =
        quantity <= 0
          ? state.cart.filter((item) => item.product.id !== productId)
          : state.cart.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            );
      saveToStorage('digistore-cart', newCart);
      return { cart: newCart };
    });
  },
  clearCart: () => {
    saveToStorage('digistore-cart', []);
    set({ cart: [] });
  },
  getCartTotal: () => {
    return get().cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
  getCartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },

  // Wishlist
  wishlist: loadFromStorage('digistore-wishlist', []),
  toggleWishlist: (productId) => {
    set((state) => {
      const exists = state.wishlist.find((w) => w.productId === productId);
      const newWishlist = exists
        ? state.wishlist.filter((w) => w.productId !== productId)
        : [...state.wishlist, { productId, addedAt: new Date().toISOString() }];
      saveToStorage('digistore-wishlist', newWishlist);
      return { wishlist: newWishlist };
    });
  },
  isInWishlist: (productId) => {
    return get().wishlist.some((w) => w.productId === productId);
  },

  // Orders
  orders: loadFromStorage('digistore-orders', mockOrders),
  addOrder: (order) => {
    set((state) => {
      const newOrders = [...state.orders, order];
      saveToStorage('digistore-orders', newOrders);
      return { orders: newOrders };
    });
  },
  hasPurchased: (productId) => {
    return get().orders.some((order) =>
      order.items.some((item) => item.product.id === productId)
    );
  },

  // Reviews
  reviews: loadFromStorage('digistore-reviews', mockReviews),
  addReview: (review) => {
    set((state) => {
      const newReviews = [...state.reviews, review];
      saveToStorage('digistore-reviews', newReviews);
      // Update product rating
      const productReviews = newReviews.filter(
        (r) => r.productId === review.productId
      );
      const avgRating =
        productReviews.reduce((sum, r) => sum + r.rating, 0) /
        productReviews.length;
      const newProducts = state.products.map((p) =>
        p.id === review.productId
          ? { ...p, rating: Math.round(avgRating * 10) / 10, reviewCount: productReviews.length }
          : p
      );
      saveToStorage('digistore-products', newProducts);
      return { reviews: newReviews, products: newProducts };
    });
  },
  getProductReviews: (productId) => {
    return get().reviews.filter((r) => r.productId === productId);
  },

  // Admin
  isAdminAuthenticated: loadFromStorage('digistore-admin-auth', false),
  adminLogin: (password) => {
    if (password === ADMIN_PASSWORD) {
      saveToStorage('digistore-admin-auth', true);
      set({ isAdminAuthenticated: true });
      return true;
    }
    return false;
  },
  adminLogout: () => {
    saveToStorage('digistore-admin-auth', false);
    set({ isAdminAuthenticated: false });
  },

  // Filters
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: 'all',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  priceRange: [0, 200],
  setPriceRange: (range) => set({ priceRange: range }),
  minRating: 0,
  setMinRating: (rating) => set({ minRating: rating }),
  sortBy: 'newest',
  setSortBy: (sort) => set({ sortBy: sort }),

  getFilteredProducts: () => {
    const state = get();
    let filtered = state.products.filter((p) => p.status === 'published');

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (state.selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === state.selectedCategory);
    }

    filtered = filtered.filter(
      (p) => p.price >= state.priceRange[0] && p.price <= state.priceRange[1]
    );

    if (state.minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= state.minRating);
    }

    switch (state.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return filtered;
  },
}));
