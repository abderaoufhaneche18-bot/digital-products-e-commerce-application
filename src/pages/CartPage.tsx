import React from 'react';
import { useStore } from '../store/useStore';
import { TrashIcon, PlusIcon, MinusIcon, ShoppingCartIcon, ChevronLeftIcon } from '../components/Icons';

interface CartPageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useStore();
  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCartIcon size={32} className="text-surface-400" />
        </div>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
          Your cart is empty
        </h2>
        <p className="text-surface-500 dark:text-surface-400 mb-6">
          Discover our digital products and add them to your cart
        </p>
        <button
          onClick={() => onNavigate('products')}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <button
        onClick={() => onNavigate('products')}
        className="flex items-center gap-1 text-sm text-surface-500 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
      >
        <ChevronLeftIcon size={16} />
        Continue Shopping
      </button>

      <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-8">
        Shopping Cart ({cart.length} item{cart.length !== 1 ? 's' : ''})
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 p-4 bg-white dark:bg-surface-800/50 rounded-xl border border-surface-200 dark:border-surface-700/50 animate-fade-in"
            >
              <img
                src={item.product.coverImage}
                alt={item.product.name}
                className="w-24 h-24 sm:w-28 sm:h-20 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3
                  className="font-semibold text-surface-900 dark:text-white text-sm sm:text-base cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors truncate"
                  onClick={() => onNavigate('product-detail', item.product.id)}
                >
                  {item.product.name}
                </h3>
                <p className="text-sm text-surface-500 dark:text-surface-400 capitalize mt-0.5">
                  {item.product.category === 'ebooks' ? 'eBook' : item.product.category === 'templates' ? 'Template' : 'Course'}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                    >
                      <MinusIcon size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-surface-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                    >
                      <PlusIcon size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-surface-900 dark:text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-surface-400 hover:text-red-500 transition-colors"
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
              Order Summary
            </h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm text-surface-600 dark:text-surface-400">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-surface-600 dark:text-surface-400">
                <span>Discount</span>
                <span className="text-emerald-600">-$0.00</span>
              </div>
              <div className="flex justify-between text-sm text-surface-600 dark:text-surface-400">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
            </div>

            <div className="border-t border-surface-200 dark:border-surface-700 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="font-semibold text-surface-900 dark:text-white">Total</span>
                <span className="text-xl font-bold text-surface-900 dark:text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('checkout')}
              className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-primary-500/25"
            >
              Proceed to Checkout
            </button>

            <p className="text-center text-xs text-surface-400 mt-3">
              🔒 Secure checkout with SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
