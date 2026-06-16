import React from 'react';
import { useStore } from '../../store/useStore';
import StarRating from '../../components/StarRating';

const AdminReviews: React.FC = () => {
  const { reviews, products } = useStore();
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getProductName = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    return product?.name || 'Unknown Product';
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Customer Reviews</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">{reviews.length} total reviews</p>
      </div>

      {sortedReviews.length > 0 ? (
        <div className="space-y-4">
          {sortedReviews.map((review) => (
            <div
              key={review.id}
              className="p-5 bg-white dark:bg-surface-800/50 rounded-xl border border-surface-200 dark:border-surface-700/50"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-semibold text-surface-900 dark:text-white">
                    {review.customerName}
                  </p>
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    on {getProductName(review.productId)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StarRating rating={review.rating} size={14} />
                  <span className="text-xs text-surface-400">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-surface-400">
          <p className="text-lg mb-1">No reviews yet</p>
          <p className="text-sm">Customer reviews will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
