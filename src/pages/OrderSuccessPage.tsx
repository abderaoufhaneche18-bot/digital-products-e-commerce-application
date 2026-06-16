import React from 'react';
import { useStore } from '../store/useStore';
import { CheckIcon, DownloadIcon, ShoppingBagIcon } from '../components/Icons';

interface OrderSuccessPageProps {
  orderId: string;
  onNavigate: (page: string, data?: unknown) => void;
}

const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ orderId, onNavigate }) => {
  const { orders } = useStore();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Order not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 animate-fade-in">
      {/* Success Animation */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
          <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center">
            <CheckIcon size={28} className="text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">
          Payment Successful! 🎉
        </h1>
        <p className="text-surface-500 dark:text-surface-400">
          Your order has been confirmed. You can download your products below.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 overflow-hidden mb-6">
        <div className="p-5 border-b border-surface-200 dark:border-surface-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-surface-400 mb-0.5">Order ID</p>
              <p className="text-sm font-mono font-medium text-surface-900 dark:text-white">
                {order.id}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-surface-400 mb-0.5">Date</p>
              <p className="text-sm text-surface-700 dark:text-surface-300">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-surface-100 dark:divide-surface-700/50">
          {order.items.map((item) => (
            <div key={item.product.id} className="p-5 flex items-center gap-4">
              <img
                src={item.product.coverImage}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-surface-900 dark:text-white text-sm">
                  {item.product.name}
                </h3>
                <p className="text-xs text-surface-400 mt-0.5">
                  {item.product.category === 'ebooks' ? 'eBook' : item.product.category === 'templates' ? 'Template' : 'Course'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-surface-900 dark:text-white">
                  ${item.product.price.toFixed(2)}
                </span>
                <button className="flex items-center gap-1.5 px-3 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg text-xs font-medium hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors">
                  <DownloadIcon size={12} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 bg-surface-50 dark:bg-surface-800/80">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-surface-900 dark:text-white">Total Paid</span>
            <span className="text-xl font-bold text-surface-900 dark:text-white">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl mb-6">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          📧 A confirmation email has been sent to <strong>{order.customerEmail}</strong> with your download links.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => onNavigate('products')}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
        >
          <ShoppingBagIcon size={16} />
          Continue Shopping
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-3 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
