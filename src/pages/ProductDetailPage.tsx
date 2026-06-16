import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import StarRating from '../components/StarRating';
import {
  ShoppingCartIcon,
  HeartIcon,
  ChevronLeftIcon,
  DownloadIcon,
  CheckIcon,
  BookIcon,
  LayoutIcon,
  PlayCircleIcon,
} from '../components/Icons';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, data?: unknown) => void;
}

const categoryLabels: Record<string, string> = {
  ebooks: 'eBook',
  templates: 'Design Template',
  courses: 'Online Course',
};

const categoryIcons: Record<string, React.ReactNode> = {
  ebooks: <BookIcon size={16} />,
  templates: <LayoutIcon size={16} />,
  courses: <PlayCircleIcon size={16} />,
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onNavigate }) => {
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    cart,
    getProductReviews,
    addReview,
    hasPurchased,
  } = useStore();

  const product = products.find((p) => p.id === productId);
  const reviews = getProductReviews(productId);
  const inCart = cart.some((item) => item.product.id === productId);
  const inWishlist = isInWishlist(productId);
  const purchased = hasPurchased(productId);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Product not found</h2>
        <button onClick={() => onNavigate('products')} className="text-primary-600 dark:text-primary-400 font-medium">
          Back to Products
        </button>
      </div>
    );
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim() || !reviewName.trim()) return;

    addReview({
      id: `rev-${Date.now()}`,
      productId,
      customerName: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      createdAt: new Date().toISOString(),
    });

    setReviewComment('');
    setReviewName('');
    setReviewRating(5);
    setShowReviewForm(false);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <button
        onClick={() => onNavigate('products')}
        className="flex items-center gap-1 text-sm text-surface-500 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
      >
        <ChevronLeftIcon size={16} />
        Back to Products
      </button>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden bg-surface-100 dark:bg-surface-800 aspect-[16/10]">
          <img
            src={product.coverImage}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-lg text-sm font-medium text-surface-700 dark:text-surface-300">
            {categoryIcons[product.category]}
            {categoryLabels[product.category]}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-4 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <StarRating rating={product.rating} size={18} />
            <span className="text-sm text-surface-500 dark:text-surface-400">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-surface-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Features */}
          {product.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-200 mb-3">
                What's Included
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
                    <CheckIcon size={14} className="text-emerald-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => addToCart(product)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all ${
                inCart
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                  : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40'
              }`}
            >
              <ShoppingCartIcon size={18} />
              {inCart ? 'Added to Cart' : 'Add to Cart'}
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`px-4 py-3.5 rounded-xl font-semibold transition-all border ${
                inWishlist
                  ? 'bg-accent-50 dark:bg-accent-900/20 border-accent-200 dark:border-accent-800 text-accent-600 dark:text-accent-400'
                  : 'border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-accent-300 dark:hover:border-accent-600'
              }`}
            >
              <HeartIcon size={18} filled={inWishlist} />
            </button>
          </div>

          {/* Purchased Download */}
          {purchased && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl mb-6 animate-scale-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center">
                  <DownloadIcon size={18} className="text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm">
                    You own this product!
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    Click to download or access your content
                  </p>
                </div>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                  Download
                </button>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="border-t border-surface-200 dark:border-surface-700/50 pt-6">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-3">
              Description
            </h3>
            <div className="text-surface-600 dark:text-surface-400 leading-relaxed whitespace-pre-line text-sm">
              {product.description}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 border-t border-surface-200 dark:border-surface-700/50 pt-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
            Reviews ({reviews.length})
          </h2>
          {purchased && !showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              Write a Review
            </button>
          )}
        </div>

        {/* Review Success */}
        {reviewSubmitted && (
          <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 text-sm font-medium animate-scale-in">
            ✅ Your review has been submitted successfully!
          </div>
        )}

        {/* Review Form */}
        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-surface-50 dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 animate-slide-up">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
              Write Your Review
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2.5 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none focus:border-primary-400 transition-colors"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Rating
              </label>
              <StarRating
                rating={reviewRating}
                interactive
                onRate={setReviewRating}
                size={24}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Your Review
              </label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience with this product..."
                required
                rows={4}
                className="w-full px-4 py-2.5 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none focus:border-primary-400 transition-colors resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-2.5 bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 rounded-xl text-sm font-medium hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-5 bg-white dark:bg-surface-800/50 rounded-xl border border-surface-200 dark:border-surface-700/50"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-semibold text-surface-900 dark:text-white text-sm">
                      {review.customerName}
                    </span>
                    <div className="mt-1">
                      <StarRating rating={review.rating} size={14} />
                    </div>
                  </div>
                  <span className="text-xs text-surface-400">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed mt-2">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-surface-400 dark:text-surface-500">
            <p className="text-lg mb-1">No reviews yet</p>
            <p className="text-sm">Be the first to review this product!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
