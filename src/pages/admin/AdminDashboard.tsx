import React from 'react';
import { useStore } from '../../store/useStore';
import {
  PackageIcon,
  ShoppingBagIcon,
  DollarSignIcon,
  BarChartIcon,
  MessageSquareIcon,
} from '../../components/Icons';
import StarRating from '../../components/StarRating';

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { products, orders, reviews } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const publishedProducts = products.filter((p) => p.status === 'published').length;
  const draftProducts = products.filter((p) => p.status === 'draft').length;
  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  const recentReviews = [...reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      sub: `${publishedProducts} published, ${draftProducts} draft`,
      icon: <PackageIcon size={20} />,
      iconColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Total Orders',
      value: orders.length,
      sub: 'All time',
      icon: <ShoppingBagIcon size={20} />,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      sub: 'All time revenue',
      icon: <DollarSignIcon size={20} />,
      iconColor: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      label: 'Total Reviews',
      value: reviews.length,
      sub: 'Customer reviews',
      icon: <MessageSquareIcon size={20} />,
      iconColor: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`p-5 bg-white dark:bg-surface-800/50 rounded-xl border border-surface-200 dark:border-surface-700/50 animate-fade-in stagger-${i + 1}`}
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <div className={stat.iconColor}>
                  {stat.icon}
                </div>
              </div>
              <span className="text-sm text-surface-500 dark:text-surface-400">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</div>
            <p className="text-xs text-surface-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-surface-800/50 rounded-xl border border-surface-200 dark:border-surface-700/50 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-700/50">
            <h2 className="font-semibold text-surface-900 dark:text-white flex items-center gap-2">
              <BarChartIcon size={16} />
              Recent Orders
            </h2>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs text-primary-600 dark:text-primary-400 font-medium"
            >
              View All
            </button>
          </div>
          {recentOrders.length > 0 ? (
            <div className="divide-y divide-surface-100 dark:divide-surface-700/50">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-surface-900 dark:text-white">{order.customerName}</p>
                    <p className="text-xs text-surface-400">{order.customerEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-surface-900 dark:text-white">${order.total.toFixed(2)}</p>
                    <p className="text-xs text-surface-400">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-surface-400 text-sm">No orders yet</div>
          )}
        </div>

        {/* Recent Reviews */}
        <div className="bg-white dark:bg-surface-800/50 rounded-xl border border-surface-200 dark:border-surface-700/50 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-700/50">
            <h2 className="font-semibold text-surface-900 dark:text-white flex items-center gap-2">
              <MessageSquareIcon size={16} />
              Recent Reviews
            </h2>
            <button
              onClick={() => onNavigate('reviews')}
              className="text-xs text-primary-600 dark:text-primary-400 font-medium"
            >
              View All
            </button>
          </div>
          {recentReviews.length > 0 ? (
            <div className="divide-y divide-surface-100 dark:divide-surface-700/50">
              {recentReviews.map((review) => (
                <div key={review.id} className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-surface-900 dark:text-white">
                      {review.customerName}
                    </span>
                    <StarRating rating={review.rating} size={12} />
                  </div>
                  <p className="text-xs text-surface-500 dark:text-surface-400 line-clamp-2">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-surface-400 text-sm">No reviews yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
