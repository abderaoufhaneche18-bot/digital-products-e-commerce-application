import React from 'react';
import { StarIcon } from './Icons';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 16,
  interactive = false,
  onRate,
}) => {
  const [hovered, setHovered] = React.useState(0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }, (_, i) => {
        const starValue = i + 1;
        const isFilled = interactive
          ? starValue <= (hovered || rating)
          : starValue <= rating;
        const isHalf = !interactive && !isFilled && starValue - 0.5 <= rating;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => onRate?.(starValue)}
            onMouseEnter={() => interactive && setHovered(starValue)}
            onMouseLeave={() => interactive && setHovered(0)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform ${
              isFilled || isHalf ? 'text-amber-400' : 'text-surface-300 dark:text-surface-600'
            }`}
          >
            <StarIcon size={size} filled={isFilled || isHalf} />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
