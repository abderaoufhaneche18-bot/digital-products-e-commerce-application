import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminReviews from './AdminReviews';
import {
  HomeIcon,
  PackageIcon,
  ShoppingBagIcon,
  MessageSquareIcon,
  LogOutIcon,
  SparklesIcon,
  SunIcon,
  MoonIcon,
  MenuIcon,
  XIcon,
  ChevronLeftIcon,
} from '../../components/Icons';

interface AdminPageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

type AdminTab = 'dashboard' | 'products' | 'orders' | 'reviews';

const tabs: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <HomeIcon size={18} /> },
  { key: 'products', label: 'Products', icon: <PackageIcon size={18} /> },
  { key: 'orders', label: 'Orders', icon: <ShoppingBagIcon size={18} /> },
  { key: 'reviews', label: 'Reviews', icon: <MessageSquareIcon size={18} /> },
];

const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const { isAdminAuthenticated, adminLogout, isDark, toggleTheme } = useStore();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAdminAuthenticated) {
    return <AdminLogin onSuccess={() => {}} />;
  }

  const handleLogout = () => {
    adminLogout();
    onNavigate('home');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard onNavigate={setActiveTab as (tab: string) => void} />;
      case 'products':
        return <AdminProducts />;
      case 'orders':
        return <AdminOrders />;
      case 'reviews':
        return <AdminReviews />;
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 flex flex-col transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
              <SparklesIcon size={18} className="text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-surface-900 dark:text-white">DigiStore</span>
              <p className="text-[10px] font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider -mt-0.5">
                Admin Panel
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-surface-400"
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-surface-200 dark:border-surface-800 space-y-1">
          <button
            onClick={() => onNavigate('home')}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          >
            <ChevronLeftIcon size={18} />
            Back to Store
          </button>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          >
            {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOutIcon size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-surface-50/80 dark:bg-surface-950/80 backdrop-blur-xl border-b border-surface-200 dark:border-surface-800 px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg transition-colors"
            >
              <MenuIcon size={20} />
            </button>
            <h2 className="text-lg font-semibold text-surface-900 dark:text-white capitalize">
              {activeTab}
            </h2>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
