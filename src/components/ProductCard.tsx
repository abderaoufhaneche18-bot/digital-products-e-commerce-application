import React from 'react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { HeartIcon, ShoppingCartIcon, BookIcon, LayoutIcon, PlayCircleIcon } from './Icons';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, data?: unknown) => void;
  index?: number;
}

const categoryIcons: Record<string, React.ReactNode> = {
  ebooks: <BookIcon size={14} />,
  templates: <LayoutIcon size={14} />,
  courses: <PlayCircleIcon size={14} />,
};

const categoryLabels: Record<string, string> = {
  ebooks: 'eBook',
  templates: 'Template',
  courses: 'Course',
};

const categoryColors: Record<string, string> = {
  ebooks: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  templates: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  courses: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate, index = 0 }) => {
  const { addToCart, toggleWishlist, isInWishlist, cart } = useStore();
  const inWishlist = isInWishlist(product.id);
  const inCart = cart.some((item) => item.product.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => onNavigate('product-detail', product.id)}
      className={`group bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-surface-200/50 dark:hover:shadow-surface-900/50 hover:-translate-y-1 transition-all duration-300 animate-fade-in stagger-${Math.min(index + 1, 6)}`}
      style={{ opacity: 0 }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-100 dark:bg-surface-800">
        <img
          src={product.coverImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Category Badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${categoryColors[product.category]}`}>
          {categoryIcons[product.category]}
          {categoryLabels[product.category]}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
            inWishlist
              ? 'bg-accent-500/90 text-white shadow-lg'
              : 'bg-white/80 dark:bg-surface-800/80 text-surface-600 dark:text-surface-300 hover:bg-white dark:hover:bg-surface-700'
          }`}
        >
          <HeartIcon size={16} filled={inWishlist} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-base font-semibold text-surface-900 dark:text-surface-100 line-clamp-2 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} size={14} />
          <span className="text-xs text-surface-500 dark:text-surface-400">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price & Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-surface-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
              inCart
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-500/25 hover:shadow-primary-500/40'
            }`}
          >
            <ShoppingCartIcon size={14} />
            {inCart ? 'In Cart' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
