import { useState, useEffect, useCallback } from 'react';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import WishlistPage from './pages/WishlistPage';
import AdminPage from './pages/admin/AdminPage';

type PageState = {
  page: string;
  data?: unknown;
};

function App() {
  const { isDark } = useStore();
  const [pageState, setPageState] = useState<PageState>(() => {
    // Check if the initial URL has /admin hash
    const hash = window.location.hash.slice(1);
    if (hash === '/admin' || hash === 'admin') {
      return { page: 'admin' };
    }
    return { page: 'home' };
  });

  // Apply dark mode on mount
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navigate = useCallback((page: string, data?: unknown) => {
    setPageState({ page, data });
    // Update hash for admin route
    if (page === 'admin') {
      window.location.hash = '/admin';
    } else {
      if (window.location.hash) {
        window.location.hash = '';
      }
    }
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen for hash changes (for /admin route)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash === '/admin' || hash === 'admin') {
        setPageState({ page: 'admin' });
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const renderPage = () => {
    switch (pageState.page) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'products':
        return <ProductsPage onNavigate={navigate} />;
      case 'product-detail':
        return (
          <ProductDetailPage
            productId={pageState.data as string}
            onNavigate={navigate}
          />
        );
      case 'cart':
        return <CartPage onNavigate={navigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={navigate} />;
      case 'order-success':
        return (
          <OrderSuccessPage
            orderId={pageState.data as string}
            onNavigate={navigate}
          />
        );
      case 'wishlist':
        return <WishlistPage onNavigate={navigate} />;
      case 'admin':
        return <AdminPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  // Admin page has its own layout
  if (pageState.page === 'admin') {
    return (
      <div className="min-h-screen bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-100">
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-surface-950 text-surface-900 dark:text-surface-100">
      <Navbar onNavigate={navigate} currentPage={pageState.page} />
      <main className="min-h-[calc(100vh-4rem)]">
        {renderPage()}
      </main>
      {/* Footer */}
      <footer className="bg-surface-50 dark:bg-surface-900/50 border-t border-surface-200 dark:border-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-surface-900 dark:text-white mb-3">DigiStore</h3>
              <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                Premium digital products marketplace. eBooks, templates, courses and more.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-surface-900 dark:text-white mb-3 text-sm">Products</h4>
              <ul className="space-y-2">
                {['eBooks', 'Design Templates', 'Online Courses'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => navigate('products')}
                      className="text-sm text-surface-500 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-surface-900 dark:text-white mb-3 text-sm">Support</h4>
              <ul className="space-y-2">
                {['Help Center', 'Contact Us', 'Refund Policy'].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-surface-500 dark:text-surface-400 cursor-default">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-surface-900 dark:text-white mb-3 text-sm">Company</h4>
              <ul className="space-y-2">
                {['About Us', 'Blog', 'Careers'].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-surface-500 dark:text-surface-400 cursor-default">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-surface-200 dark:border-surface-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-surface-400">
              © 2025 DigiStore. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-surface-400">
              <span className="cursor-default">Terms</span>
              <span className="cursor-default">Privacy</span>
              <button
                onClick={() => navigate('admin')}
                className="text-surface-300 dark:text-surface-600 hover:text-primary-500 transition-colors"
                title="Admin Panel"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
