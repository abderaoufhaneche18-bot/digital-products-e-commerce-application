import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { LockIcon, SparklesIcon } from '../../components/Icons';

interface AdminLoginProps {
  onSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const { adminLogin } = useStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(password);
    if (success) {
      onSuccess();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-950 dark:to-surface-900 px-4">
      <div className={`w-full max-w-sm animate-scale-in ${shaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary-500/25">
            <SparklesIcon size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Admin Panel</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
            Enter the admin password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-6 shadow-xl shadow-surface-200/50 dark:shadow-none">
          <div className="mb-4">
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Password
            </label>
            <div className="relative">
              <LockIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter admin password"
                autoFocus
                className={`w-full pl-11 pr-4 py-3 bg-surface-50 dark:bg-surface-800 border rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none transition-colors ${
                  error ? 'border-red-400 focus:border-red-400' : 'border-surface-200 dark:border-surface-700 focus:border-primary-400'
                }`}
              />
            </div>
            {error && (
              <p className="text-xs text-red-500 mt-2 animate-slide-down">
                ❌ Incorrect password. Try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors"
          >
            Sign In
          </button>

          <p className="text-xs text-center text-surface-400 mt-4">
            Hint: admin123
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
