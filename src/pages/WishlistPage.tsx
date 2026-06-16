import React from 'react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import { HeartIcon } from '../components/Icons';

interface WishlistPageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ onNavigate }) => {
  const { wishlist, products } = useStore();

  const wishlistProducts = wishlist
    .map((w) => products.find((p) => p.id === w.productId))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <HeartIcon size={32} className="text-surface-400" />
        </div>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-surface-500 dark:text-surface-400 mb-6">
          Save products you love to your wishlist
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">
        My Wishlist
      </h1>
      <p className="text-surface-500 dark:text-surface-400 mb-8">
        {wishlistProducts.length} saved product{wishlistProducts.length !== 1 ? 's' : ''}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistProducts.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            onNavigate={onNavigate}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
