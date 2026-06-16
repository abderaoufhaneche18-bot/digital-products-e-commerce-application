import React from 'react';
import { useStore } from '../../store/useStore';

const AdminOrders: React.FC = () => {
  const { orders } = useStore();
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Orders</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">{orders.length} total orders</p>
      </div>

      {sortedOrders.length > 0 ? (
        <div className="space-y-4">
          {sortedOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-surface-800/50 rounded-xl border border-surface-200 dark:border-surface-700/50 overflow-hidden"
            >
              <div className="p-5 border-b border-surface-100 dark:border-surface-700/50">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-mono text-surface-500 dark:text-surface-400">
                      {order.id}
                    </p>
                    <p className="font-semibold text-surface-900 dark:text-white">
                      {order.customerName}
                    </p>
                    <p className="text-sm text-surface-500 dark:text-surface-400">
                      {order.customerEmail}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-surface-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-xs text-surface-400">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-surface-50 dark:divide-surface-700/30">
                {order.items.map((item) => (
                  <div key={item.product.id} className="px-5 py-3 flex items-center gap-3">
                    <img
                      src={item.product.coverImage}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-surface-900 dark:text-white truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-surface-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-surface-400">
          <p className="text-lg mb-1">No orders yet</p>
          <p className="text-sm">Orders will appear here once customers make purchases.</p>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
